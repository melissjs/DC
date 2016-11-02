import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Volunteer} from '../../volunteer';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import {RestService} from '../../providers/rest-service/rest-service';
// import { AccountsettingsPage } from '../accountsettings/accountsettings';
// import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { SigninsuccessPage } from '../signinsuccess/signinsuccess';
import {Pollingstationservice} from '../../providers/pollingstationservice/pollingstationservice';
import {AuthenticationPage} from '../../pages/authentication/authentication';

import * as globals from '../../globals';

/*
  Generated class for the LogincomponentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  // selector: 'logincomponent',
  templateUrl: 'build/pages/loginpagema/loginpagema.html',
  // inputs: ['Volunteer']
})
export class LoginPageMa {
loginForm: FormGroup;
volunteerHere: Volunteer;
loggedIn: boolean;
errorMessage: string;
    enterPhoneNumber: string;
    enterPasscode: string;

    authenticatingVolunteerPhone: string;
    authenticatingVolunteerPasscode: string;

//pollingstationservice: Pollingstationservice;
  
  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public fb: FormBuilder, private pollingstationservice: Pollingstationservice, private volSvc: Volunteerservice, private restSvc: RestService ) {
  this.navCtrl = navCtrl;
  this.volSvc = volSvc;
  this.pollingstationservice = pollingstationservice;
  //this.volunteerHere = null;
  this.restSvc = restSvc;
  this.loggedIn = false;
      

  this.loginForm = fb.group({  
            'enterPhoneNumber': ['', Validators.compose([Validators.required, Validators.pattern(globals.REGEXPHONE)])],
            'enterPasscode': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
  }


    onChangePhoneNumber(value: string) {
        if (!value.match(globals.REGEXPHONE)) {
            this.errorMessage = 'ERROR: Phone Number must be exactly 10 digits';
            this.enterPhoneNumber = '';
        } else {
            this.enterPhoneNumber = value;
        }
    }

    onChangePasscode(value) {
        if (value.length < 8) {
            this.errorMessage = 'ERROR: Password is less than 8 characters';
        }
        this.enterPasscode = value;
    }

    onSubmit(value: any): void { 

        var that = this;
        if ((that.enterPasscode == null) || (that.enterPhoneNumber == null)) {
            this.errorMessage = 'Need to fill in both fields';
            return;
        }
        try {
            that.restSvc.loginUser(that.enterPhoneNumber, that.enterPasscode)
                .subscribe( (data) => {
                    // that.properties = data;
                    // Expect response created here...
                    if (data.status == 200) {
                        console.log('successful call:' + data);
                        // this.restSvc.checkLoggedIn();
                        this.successForward(true,that.enterPhoneNumber);
                        return;
                    } else {
                        // ?? shouldn't happen ??
                        console.log('UNKNOWN STATUS:' + data);
                        this.errorMessage = 'Unknown Error occurred attempting to login';
                        // 'We could not find your number in the system. Remember to enter only numbers (10 digits).'
                    }
                } , err => {
                    console.log('error occurred ' + err.toString());
                    var subtitle;
                    if ((err.status == 0) ||
                        (err.status == 404)) {
                        // For the fake version.. we look it up in memory..     
                        var vol = 
                            that.volSvc.getVolunteerbyPhoneNumber(that.enterPhoneNumber);
                        if (vol) {
                            // Simulate a successful login
			    var ps = this.pollingstationservice.getPollingStationbyKey
			    (vol.associatedPollingStationKey);
			    this.pollingstationservice.setStation(ps);
                            this.successForward(false,that.enterPhoneNumber);
                        } else {
                            // Simulate a bad login
                            that.errorMessage = "Authentication failed (enter a real fake user) :)";
                        }
                        // fake success
                    } else if (err.status == 400) {
                        that.errorMessage = err._body; // toString();
                    } else if (err.status == 401) {
                        // Actual error (most likely bad password)
                        if (err._body) {
                            var jsonobj = JSON.parse(err._body);
                            that.errorMessage = jsonobj.message;
                        } else {
                            that.errorMessage = err.toString();
                        }
                    } else {
                        that.errorMessage = err.toString() + ':' + err._body;
                    }
                }, () => {console.log('login complete');
                          //use timeout to call initIonic in order to reset
                          //CSRF TOKEN
                          if (that.errorMessage == null) {
                              setTimeout(()=>{
                                  this.restSvc.initIonic(true,that.enterPhoneNumber);
                              },250);
                          }
                         });
        } catch (err) {
            console.error(err);
            console.log('error in Submitting, exc='+ err.toString());
            this.errorMessage = err.toString();
        }

    }

    successForward(real:boolean,phoneNumber) {
        var that = this;
        that.errorMessage = null;
        if (!real) {

            // fake version.. lookup data in rest-service now

            // console.log(error.stack());
            let alert = that.alertCtrl.create({
                title: 'TEST MODE: Simulating Logging In',
                subTitle: 'This simulates a login',
                buttons: [{
                    text: 'OK',
                    handler: () => {
                        alert.dismiss();
                    }
                }]
            });
            //timeout the error to let other modals finish dismissing.
            setTimeout(()=>{
                this.restSvc.initIonic(true,phoneNumber);
                alert.present();
            },250);
        }
        // this.loggedIn = true;
        // this.restSvc.setLoggedIn(this.loggedIn);

        try {
            this.navCtrl.setRoot(AuthenticationPage);
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
            console.log(EE.stack);
        }

    }

}
