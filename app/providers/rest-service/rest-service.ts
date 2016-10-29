import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as config from '../../config';
import { Volunteer} from '../../volunteer';

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
    loggedIn: boolean;
    lastLoginCheck: number;
    MIN_LOGIN_CHECK_TIME: number = 15000; // 15 seconds

    constructor(private http: Http) {
        // generate values
        this.jsessionid = null;
        this.csrf_token = null;
        this.loggedIn = false; //CHANGE BACK TO FALSE AFTER TESTING
        this.lastLoginCheck = 0;

        // submit call to initialize ionic.
        this.initIonic();

    }

    initIonic() {

        // let options = new RequestOptions({ headers: headers });
        var url = config.MT_HOST + '/api/ionicinit' + this.cacheBuster();

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
                }
            } else {
                console.log('error init ionicinit call:' + data.message);
            }
        }, err => {
            console.log('error occurred in ionicinit ' + err.toString());
            if ((err.status == 0) ||
                (err.status == 404)) {
                console.log('error expected in standalone ionic app');
                return;
            }
        }, () => {console.log('ionicinit complete')});
    }

    // This method should not be available, but we allow it for value false (logout)
    setLoggedIn(passedLoginValue){
        if (!passedLoginValue) {
            this.loggedIn = passedLoginValue;
            // Call initIonic again to establish another CSRF TOKEN
            this.initIonic();
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
    }

    setLoginFalse(that) {
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
                that.loggedIn = true; // "Unknown Error!";
                cbtrue(thatobj);
                // fake success
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
    
    cacheBuster() {
        var now = new Date().getTime();
        var retval = '?cacheBuster=' + now;
        return retval;
    }

    registerUser(nv: Volunteer) {
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
              "email": nv.emailAddress, "password": nv.passcode, "langKey": "en" };
        var json = JSON.stringify(property);
        var params = /* 'json=' +  */ json;
        let headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        if (this.csrf_token != null) {
            headers.append('X-CSRF-TOKEN', this.csrf_token);
        }
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        var url = config.MT_HOST + '/api/register' + this.cacheBuster();
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

        var url = config.MT_HOST + '/api/authentication' + this.cacheBuster();
        var retval1 = this.http.post(url, body, options);
        // body, options
        var retval2 = retval1;
        return retval2;
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

        var url = config.MT_HOST + '/api/logout' + this.cacheBuster();
        var retval1 = this.http.post(url, params, options);
        // body, options
        var retval2 = retval1;
        // Token will be deleted.
        this.csrf_token = null;
        return retval2;
    }

    /* handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error' + error.toString());
    }
    */
    resetPasswordInit(emailAddress: string) {
        
    }

}
