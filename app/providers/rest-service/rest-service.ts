import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as config from '../../config';
import { Volunteer} from '../../volunteer';
import { Volunteerservice} from '../volunteerservice/volunteerservice';
import { Pollingstationservice} from '../pollingstationservice/pollingstationservice';
let authyURL = config.AUTHY_VER_URL;

/*
  Generated class for the RestService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestService {

    jsessionid: string;
    csrf_token: string;
    lastLoginCheck: number;
    lastPollingCheck: number;
    hashedPassCode: number;
    attemptedPassCode: number;
    lastPollingStationDate: any;
    successLVR: any;
    failureLVR: any;
    cbobj: any;

    public loggedIn: boolean;

    MIN_LOGIN_CHECK_TIME: number = 15000; // 15 seconds

    constructor(private http: Http,private volSvc: Volunteerservice,
                private polSvc: Pollingstationservice) {
        // generate values
        this.jsessionid = null;
        this.csrf_token = null;
        this.loggedIn = false;
        this.lastLoginCheck = 0;
        this.lastPollingCheck = 0;
        this.hashedPassCode = 0;
        this.attemptedPassCode = 0;
        this.lastPollingStationDate = null;
        this.successLVR = null;
        this.failureLVR = null;
        this.cbobj = null;

        // submit call to initialize ionic.
        this.initIonic(false,null);
    }

    initIonic(onlogin: boolean,phoneNumber: string) {

        if (onlogin) {
            this.hashedPassCode = this.attemptedPassCode;
        }
        // let options = new RequestOptions({ headers: headers });
        var url = config.MT_HOST + '/api/ionicinit' + this.cacheBuster(true);

        // var retval1 = this.http.post(url, params, { headers: headers });
        var retval1 = this.http.get(url);
        
        // body, options

        var retval2 = retval1.map(
            res => res.json()
        );
        var that = this;
        retval2.subscribe( data => {
            console.log('successful ionicinit call:' + data);
            if (data._csrf != null) {
                var csrfToken = data._csrf;
                if (csrfToken != null) {
                    that.setCsrfToken(csrfToken[0]);
                    console.log('CSRF-TOKEN updated in init to:'+
                                this.csrf_token);
                    that.getVolunteerbyPhoneNumber(phoneNumber,onlogin);
                }
            } else {
                console.log('error init ionicinit call:' + data.message);
            }
        }, err => {
            console.log('error occurred in ionicinit ' + err.toString());
            if ((err.status == 0) ||
                (err.status == 404)) {
                console.log('error expected in standalone ionic app:' + onlogin);
                if (onlogin) {
                    that.loggedIn = true;
                    if (phoneNumber != null) {
                        // For the fake version.. we look it up in memory..
                        var vol = 
                            that.volSvc.getVolunteerbyPhoneNumber(phoneNumber);
                        that.volSvc.setNewVolunteer(vol);
                    }
                }
                return;
            }
        }, () => {console.log('ionicinit complete')});
    }

    // This method should not be available, but we allow it for value false (logout)
    setLoggedIn(passedLoginValue){
        if (!passedLoginValue) {
            this.loggedIn = passedLoginValue;
        } else {
            // login required for "true" no op.
            console.log('login required for "true" no op for setLoggedIn.');
        }
    }

    // getLoggedIn() has the current "state", but when logging in.. this 
    // must be handled correctly.. so checkLoggedIn must be called.
    getLoggedIn() {
        this.checkLoggedIn(this.setLoginTrue, this.setLoginFalse, this);
        return this.loggedIn;
    }

    setLoginTrue(that) {
        that.loggedIn = true;
        var nv = that.volSvc.getNewVolunteer();
        if (nv == null || nv.phoneNumber == null) {
            // If we just came on the scene.. and nothing is assigned
            // then lookup from database.
            that.getVolunteerbyPhoneNumber(null,true);
        }
        // now call initIonic to reset the CSRF token
        // that.initIonic();
    }

    setLoginFalse(that) {
        // regardlesss of whether logged in or not.. we (attempt to) fill polling station data.
        that.getLatestPollStations();
        that.loggedIn = false;
    }

    // added checkLoggedIn, because the return for this is an Observable
    // which requires asynchronous handling or the result.
    checkLoggedIn(cbtrue, cbfalse, thatobj) {

        var dnow = new Date();
        var inow = dnow.getTime();

        if ((inow - this.lastLoginCheck) < this.MIN_LOGIN_CHECK_TIME) {
            return;
        }
        // Force to wait 15 more seconds before allowing another call.
        this.lastLoginCheck = inow;

        var url = '/api/account';

        // var retval1 = this.http.post(url, params, { headers: headers });
        var retval1 = this.http.get(url);
        
        // body, options
        // var retval2 = retval1;
        var that = this;
        retval1.subscribe( data => {
            console.log('successful getLoggedIn call:' + data);
            if (data.status == 200) {
                that.loggedIn = true;
                cbtrue(thatobj);
            } else {
                // ?? shouldn't happen ??
                console.log('UNKNOWN STATUS getLoggedIn :' + data);
                cbfalse(thatobj);
            }
        }, err => {
            console.log('error occurred getLoggedIn ' + err.toString());
            if ((err.status == 0) ||
                (err.status == 404)) {
                // Keep as current value for this case
                // i.e. do nothing...
                // fake success
                console.log('standalone remains loggedIn=' + that.loggedIn);
            } else if (err.status == 500) {
                that.loggedIn = false; // definite error
                console.log('error in getLoggedIn ' + err._body);
                cbfalse(thatobj);
            } else {
                that.loggedIn = false; // definite error
                console.log('error in getLoggedIn ' + err.toString() + err._body);
                cbfalse(thatobj);
            }
        }, () => {console.log('getLoggedIn complete')});
        //return this.loggedIn;
    }

    sendAuthyRequest(via: string, cellPhone: string) {

        // let options = new RequestOptions({ headers: null, withCredentials: true});
        var url = config.AUTHY_VER_URL + cellPhone + '?via=' + via;

        // var retval1 = this.http.post(url, params, { headers: headers });
        var retval1 = this.http.get(url);
        
        // body, options
        var that = this;
        /* var retval1b = retval1.subscribe((res) => {
            that.csrf_token = res.headers.get('CSRF-TOKEN');
        });*/

        var retval2 = retval1.map(
            res => res.json()
        );
        return retval2;
        // .catch(this.handleError);
    }

    sendActivation(key: string) {

        var url = '/api/activate' + '?key=' + key;

        // var retval1 = this.http.post(url, params, { headers: headers });
        var retval1 = this.http.get(url);
        
        // body, options
        var retval2 = retval1;
        return retval2;
    }

    setCsrfToken(value: string) {
        this.csrf_token = value;
    }

    sendAuthyVerify(cellPhone: string, code: string) {

        // let options = new RequestOptions({ headers: headers });
        var url = config.AUTHY_CHK_URL + cellPhone + '/' + code;

        // var retval1 = this.http.post(url, params, { headers: headers });
        var retval1 = this.http.get(url);
        
        // body, options

        var retval2 = retval1.map(
            res => res.json()
        );
        return retval2;
        // .catch(this.handleError);
    }
    
    cacheBuster(useq:boolean) {
        var now = new Date().getTime();
        var retval = null;
        if (useq) {
            retval = '?cacheBuster=' + now;
        } else {
            retval = '&cacheBuster=' + now;         
        }
        return retval;
    }

    registerUser(nv: Volunteer, passcode: string) {
        var blankIdx = nv.fullName.indexOf(" ");
        var firstName = null;
        var lastName = null;
        if (blankIdx < 1) {
            // no last name specified..
            firstName = nv.fullName;
        } else {
            firstName = nv.fullName.substring(0,blankIdx);
            lastName = nv.fullName.substring(blankIdx+1);
        }
        var property = 
            { "login": nv.phoneNumber, "firstName": firstName, "lastName": lastName,
              "email": nv.emailAddress, "password": passcode, "langKey": "en",
              "exposeEmail": nv.exposeEmail, "age": nv.age, "sex": nv.sex,
              "partyAffiliation": nv.partyAffiliation, "shifts": nv.shifts,
              "associatedPollingStationKey": nv.associatedPollingStationKey
            };
        var json = JSON.stringify(property);
        var params = /* 'json=' +  */ json;
        let headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        if (this.csrf_token != null) {
            headers.append('X-CSRF-TOKEN', this.csrf_token);
        }
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        var url = config.MT_HOST + '/api/registervolunteer' + this.cacheBuster(true);
        var retval1 = this.http.post(url, params, options);
        // body, options
        var retval2 = retval1;
        return retval2;
    }

    loginUser(phoneNumber: string, passcode: string) {
        let headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        if (this.csrf_token != null) {
            headers.append('X-CSRF-TOKEN', this.csrf_token);
        }
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = 'j_username=' + phoneNumber + '&j_password=' + passcode +
            '&remember-me=true&submit=Login';
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        var url = config.MT_HOST + '/api/authentication' + this.cacheBuster(true);
        var retval1 = this.http.post(url, body, options);
        // body, options
        var retval2 = retval1;
        this.attemptPasscodeChange(passcode);
        return retval2;
    }

    attemptPasscodeChange(passcode) {
        this.attemptedPassCode = this.hashPassCode(passcode);
    }

    getHashedPasscode() {
        return this.hashedPassCode;
    }

    matchesPasscode(inval: string) {
        return this.hashedPassCode == this.hashPassCode(inval);
    }

    hashPassCode(passcode: string) {
        var hash = 0;
        var chr;
        var ii;
        if (passcode.length == 0) return hash;
        for (ii = 0; ii < passcode.length; ii++) {
            chr = passcode.charCodeAt(ii);
            hash = ((hash<<5)-hash)+chr;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    logoutUser() {
        var params = null;
        let headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        if (this.csrf_token != null) {
            headers.append('X-CSRF-TOKEN', this.csrf_token);
        }
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        var url = config.MT_HOST + '/api/logout' + this.cacheBuster(true);
        var retval1 = this.http.post(url, params, options);
        // body, options
        var retval2 = retval1;
        // Token will be deleted.
        this.csrf_token = null;
        return retval2;
    }

    onLogoutXX(comp:any, errorcb, successcb){
        var that = this;
        that.logoutUser()
            .subscribe( (data) => {
                if (data.status == 200) {
                    console.log('successful logout call:' + data);
                    that.successLogout(true,comp,errorcb, successcb);
                } else {
                    // ?? shouldn't happen ??
                    console.log('UNKNOWN LOGOUT STATUS:' + data);
                    that.successLogout(true,comp,errorcb, successcb);
                }
            } , err => {
                console.log('error occurred ' + err.toString() + err._body);
                var subtitle;
                if ((err.status == 0) ||
                    (err.status == 404)) {
                    that.successLogout(false,comp,errorcb, successcb);
                    // fake success
                    return;
                } else if (err.status == 400) {
                    subtitle = err._body // toString();
                } else {
                    subtitle = err.toString();
                }
                // console.log(error.stack());
                errorcb(comp,'Error Logging Out',subtitle);
            }, () => {console.log('logout complete')});
    }

    successLogout(real: boolean,comp: any,errorcb, successcb) {
        var that = this;
        if (!real) {
            // console.log(error.stack());
            // errorcb(comp,'TEST MODE: Simulating Logging Out','');
        }
        that.setLoggedIn(false) 
        if (comp.loggedIn) {
            comp.loggedIn = false;
        }
        if (comp.currentTempVolunteer) {
            comp.currentTempVolunteer = comp.volunteerservice.setToVoidVolunteer();
        }
        // need to get a new csrf token.
        that.initIonic(false,null);
        if (successcb) {
            successcb(comp,real);
        }
    }

    /* handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error' + error.toString());
    }
    */

    resetPasswordInit(emailAddress: string) {
        let headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        if (this.csrf_token != null) {
            headers.append('X-CSRF-TOKEN', this.csrf_token);
        }
        headers.append('Content-Type', 'text/plain;charset=UTF-8');
        var body = emailAddress;
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        var url = config.MT_HOST + '/api/account/reset_password/init' + this.cacheBuster(true);
        var retval1 = this.http.post(url, body, options);
        // body, options
        var retval2 = retval1;
        return retval2;
    }

    resetPasswordFinish(key: string, newPassword: string) {
        var property = 
            { "key": key, "newPassword": newPassword };
        var json = JSON.stringify(property);
        var params = /* 'json=' +  */ json;
        let headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        if (this.csrf_token != null) {
            headers.append('X-CSRF-TOKEN', this.csrf_token);
        }
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        var url = config.MT_HOST + '/api/account/reset_password/finish' + this.cacheBuster(true);
        var retval1 = this.http.post(url, params, options);
        // body, options
        var retval2 = retval1;
        return retval2;
    }

    changePassword(newPassword: string) {
        // var json = JSON.stringify(newPassword);
        var params = /* 'json=' +  */ newPassword; // json;
        let headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        if (this.csrf_token != null) {
            headers.append('X-CSRF-TOKEN', this.csrf_token);
        }
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        var url = config.MT_HOST + '/api/account/change_password' + this.cacheBuster(true);
        var retval1 = this.http.post(url, params, options);
        // body, options
        var retval2 = retval1;
        this.attemptPasscodeChange(newPassword);
        return retval2;
    }

    getVolunteerbyPhoneNumber(phoneNumber,onlogin) {

        var paramString = '';
        if (phoneNumber != null) {
            paramString = '?phoneNumber=' + phoneNumber;
        }
        var url = config.MT_HOST + '/api/volunteer' + paramString + this.cacheBuster(false);
        // var retval1 = this.http.post(url, params, { headers: headers });
        var retval1 = this.http.get(url);
        
        // body, options

        var retval2 = retval1.map(
            res => res.json()
        );
        var that=this;
        retval2.subscribe( data => {
            console.log('successful get volunteer data call:' + data);
            if (data.phoneNumber != null) {
                this.volSvc.setNewVolunteer(data);
                this.getLatestPollStations();
            } else {
                console.log('error getting volunteer data call:' + data.message);
            }
        }, err => {
            console.log('error occurred in getting volunteer data ' + err.toString());
            if ((err.status == 0) ||
                (err.status == 404)) {
                console.log('error expected in standalone ionic app for get data call:' + phoneNumber);
                if (onlogin) {
                    that.loggedIn = true;
                    if (phoneNumber != null) {
                        // For the fake version.. we look it up in memory..
                        that.volSvc.getVolunteers();
                        var vol = 
                            that.volSvc.getVolunteerbyPhoneNumber(phoneNumber);
                        that.volSvc.setNewVolunteer(vol);
                    }
                }
                return;
            }
        }, () => {console.log('get vol data complete')});
    }

    saveVolunteerInfo() {
        var property = this.volSvc.getNewVolunteer();
        var json = JSON.stringify(property);
        var params = /* 'json=' +  */ json;
        let headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        if (this.csrf_token != null) {
            headers.append('X-CSRF-TOKEN', this.csrf_token);
        }
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        var url = config.MT_HOST + '/api/volunteers' + this.cacheBuster(true);
        var retval1 = this.http.put(url, params, options);
        // body, options
        var retval2 = retval1;
        return retval2;
    }

    getVolunteersByStation(key: string, setInternalcb, thatobj) {

        var keyQuery = '';
        if (key != null) {
            keyQuery = '?pollingStation=' + key;
        }
        var url = config.MT_HOST + '/api/volunteers' + keyQuery
            + this.cacheBuster(false);
        var retval1 = this.http.get(url);
        
        // body, options

        var retval2 = retval1.map(
            res => res.json()
        );
        var that=this;
        retval2.subscribe( data => {
            console.log('successful get volunteer list data call:' + data);
            if (data != null) {
                this.lastPollingStationDate = this.volSvc.setVolunteers(data,true);
            } else {
                console.log('error getting volunteer list data call:' + data.message);
            }
        }, err => {
            console.log('error occurred in getting volunteer list data ' + err.toString());
            if ((err.status == 0) ||
                (err.status == 404)) {
                console.log('error expected in standalone ionic app for get data call for volunteers list');
                that.volSvc.getVolunteers();
                var fakedata = that.volSvc.getTeamVolunteersByPollKey(key);
                this.volSvc.setVolunteers(fakedata,false);
                this.volSvc.generateStationStats();
                setInternalcb(thatobj);
                return;
            }
        }, () => {console.log('get volunteer data complete');
                  this.volSvc.generateStationStats();
                  setInternalcb(thatobj);});
    }

    getLatestPollStations() {

        var dnow = new Date();
        var inow = dnow.getTime();

        if ((inow - this.lastPollingCheck) < this.MIN_LOGIN_CHECK_TIME) {
            return;
        }
        // Force to wait 15 more seconds before allowing another call.
        this.lastPollingCheck = inow;

        var lastPollingDate = '';
        if (this.lastPollingStationDate != null) {
            lastPollingDate = '?createDate=' + this.lastPollingStationDate;
        }
        var url = config.MT_HOST + '/api/polling-stations' + lastPollingDate
            + this.cacheBuster(false);
        // var retval1 = this.http.post(url, params, { headers: headers });
        var retval1 = this.http.get(url);
        
        // body, options

        var retval2 = retval1.map(
            res => res.json()
        );
        var that=this;
        retval2.subscribe( data => {
            console.log('successful get polling station data call:' + data);
            if (data != null) {
                this.lastPollingStationDate = this.polSvc.addPollingStations(data);
                this.getLastVoterRecord();
            } else {
                console.log('error getting polling station data call:' + data.message);
            }
        }, err => {
            console.log('error occurred in getting polling station data ' + err.toString());
            if ((err.status == 0) ||
                (err.status == 404)) {
                console.log('error expected in standalone ionic app for get data call for polling stations');
                return;
            }
        }, () => {console.log('get polling station data complete')});
    }

    registerLVRCallbacks(successLVR, failureLVR, cbobj) {
        this.successLVR = successLVR;
        this.failureLVR = failureLVR;
        this.cbobj = cbobj;
    }

    getLastVoterRecord() {
        var volkey = this.volSvc.getNewVolunteerKey();
        if ((volkey != null) && (this.successLVR != null)) {
            this.getObjectsByField('vote-record','volunteerKey', volkey
                                   ,this.successLVR, this.failureLVR, this.cbobj);
        }
    }

    sendCollab(collabForm: any) {
        var property = collabForm;
        var json = JSON.stringify(property);
        var params = /* 'json=' +  */ json;
        let headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        if (this.csrf_token != null) {
            headers.append('X-CSRF-TOKEN', this.csrf_token);
        }
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        var url = config.MT_HOST + '/api/sendform/collabform' + this.cacheBuster(true);
        var retval1 = this.http.post(url, params, options);
        // body, options
        var retval2 = retval1;
        var that=this;
        retval2.subscribe( data => {
            console.log('successful send collaboration form data call:' + data);
        }, err => {
            console.log('error occurred in sending collaboration form data ' + err.toString());
            if ((err.status == 0) ||
                (err.status == 404)) {
                console.log('error expected in standalone ionic app for send collaboration form');
                return;
            }
        }, () => {console.log('send collaboration form data complete')});
    }

    sendContact(contactForm: any) {
        var property = contactForm;
        var json = JSON.stringify(property);
        var params = /* 'json=' +  */ json;
        let headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        if (this.csrf_token != null) {
            headers.append('X-CSRF-TOKEN', this.csrf_token);
        }
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        var url = config.MT_HOST + '/api/sendform/contact' + this.cacheBuster(true);
        var retval1 = this.http.post(url, params, options);
        // body, options
        var retval2 = retval1;
        var that=this;
        retval2.subscribe( data => {
            console.log('successful send contact form data call:' + data);
        }, err => {
            console.log('error occurred in sending contact form data ' + err.toString());
            if ((err.status == 0) ||
                (err.status == 404)) {
                console.log('error expected in standalone ionic app for send contact form');
                return;
            }
        }, () => {console.log('send contact form data complete')});
    }

    verifyExtraLogin(volunteerKey: string, passcode: string, checkonly: boolean, 
                     cbsuccess: any, cbfailure: any, thatobj: any) {
        var property = { "volunteerKey": volunteerKey, "passcode": passcode };
        var json = JSON.stringify(property);
        var params = /* 'json=' +  */ json;
        let headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        if (this.csrf_token != null) {
            headers.append('X-CSRF-TOKEN', this.csrf_token);
        }
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        var url = config.MT_HOST + '/api/sendform/extralogin' + this.cacheBuster(true);
        var retval1 = this.http.post(url, params, options);
        // body, options
        var retval2 = retval1;
        var that=this;
        retval2.subscribe( data => {
            console.log('successful send extra login data call:' + data);
            cbsuccess(thatobj,true,data);
        }, err => {
            console.log('error occurred in sending extra login data ' + err.toString());
            if ((err.status == 0) ||
                (err.status == 404)) {
                console.log('error expected in standalone ionic app for send extra login');
                cbsuccess(thatobj,false,null);
                return;
            } else {
                cbfailure(thatobj,err);
            }
        }, () => {console.log('send extra login data complete')});
    }

    saveObject(objtype:string   // the string that matches the object type
               // using dash notation (plural): so 
               //   PollingStation becomes polling-stations
               //   Volunteer      becomes volunteers
               //   etc...
               ,objdata:any     // data in a structure
               ,doadd:boolean   // are we creating a new object
               ,successcb // success callback function
               ,failurecb // failure callback function
               ,thatobj   // 'this' from the original caller
              ) {
        var params = JSON.stringify(objdata);
        let headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        if (this.csrf_token != null) {
            headers.append('X-CSRF-TOKEN', this.csrf_token);
        }
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        var url = config.MT_HOST + '/api/' + objtype + this.cacheBuster(true);
        var retval1 = null;
        if (doadd) {
            retval1 = this.http.post(url, params, options);
        } else {
            retval1 = this.http.put(url, params, options);
        }
        // body, options
        var retval2 = retval1;
        // return retval2;
        retval2.subscribe( (data) => {
            // Expect response created here...
            if (((data.status == 201) && (doadd)) ||
                ((data.status == 200) && (!doadd))) {
                console.log('successful call to save ' + objtype + ':' + data);
                if (successcb) {
                    successcb(thatobj,true, data._body);
                }
                // this.successForward(true);
            } else {
                // ?? shouldn't happen ??
                console.log('UNKNOWN STATUS calling save ' + objtype + ':' + data);
                if (successcb) {
                    successcb(thatobj,true, data._body);
                }
                // this.successForward(true);
            }
        } , err => {
            var errStr = null;
            if ((err.status == 0) ||
                (err.status == 404)) {
                console.log('faking success in save ' + objtype);
                if (successcb) {
                    successcb(thatobj,false, null);
                }
                // this.successForward(false);
                return;
            } else if (err.status == 400) {
                errStr = err._body // toString();
            } else {
                errStr = err.toString();
            }
            console.log('error occurred in save ' + objtype + ':' + err.toString());
            if (failurecb) {
                failurecb(thatobj,errStr);
            }
            // console.log(error.stack());
        }, () => {console.log('save ' + objtype + ' complete')}
                         );
    }

    getObjectsByField(
        objtype:string   // the string that matches the object type
        // using dash notation (plural): so 
        //   PollingStation becomes polling-stations
        //   Volunteer      becomes volunteers
        //   etc...
        ,fieldName       // field name to assign a value to (null if all objects)
        ,fieldValue      // value of field.
        ,successcb // success callback function
        ,failurecb // failure callback function
        ,thatobj   // 'this' from the original caller
    ) {
        // 
        var url = config.MT_HOST + '/api/'
        var query = objtype;

        if (fieldName != null) {
            query = query + '?' + fieldName + '=' + fieldValue;
        }

        url = url + query + this.cacheBuster(false);

        var retval1 = this.http.get(url);
        
        // body, options

        var retval2 = retval1.map(
            res => res.json()
        );
        var that=this;
        retval2.subscribe( data => {
            console.log('successful get ' + query + ' data call:' + data);
            if (successcb) {
                successcb(thatobj,true, data);
            }
        }, err => {
            var errStr = null;
            console.log('error occurred in getting ' + query + ' data ' + err.toString());
            if ((err.status == 0) ||
                (err.status == 404)) {
                console.log('error expected in standalone ionic app for get data call for ' + query);
                if (successcb) {
                    successcb(thatobj,false, null);
                }
                return;
            } else if (err.status == 400) {
                errStr = err._body // toString();
            } else {
                errStr = err.toString();
            }
            console.log('error occurred in get data ' + query + ':' + err.toString());
            if (failurecb) {
                failurecb(thatobj,errStr);
            }
        }, () => {console.log('get ' + query + ' data complete')});
    }
}
