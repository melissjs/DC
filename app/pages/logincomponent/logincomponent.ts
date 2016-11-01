import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Volunteer} from '../../volunteer';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import {RestService} from '../../providers/rest-service/rest-service';
import { AccountsettingsPage } from '../accountsettings/accountsettings';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { SigninsuccessPage } from '../signinsuccess/signinsuccess';
import {Pollingstationservice} from '../../providers/pollingstationservice/pollingstationservice';
import {AuthenticationPage} from '../../pages/authentication/authentication';


/*
  Generated class for the LogincomponentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'logincomponent',
  templateUrl: 'build/pages/logincomponent/logincomponent.html',
  inputs: ['Volunteer']
})
export class Logincomponent {
loginForm: FormGroup;
regExPhone: string;
//volunteerservice: Volunteerservice;
volunteerHere: Volunteer;
loggedIn: boolean;
errorMessage: string;
error: boolean;
//pollingstationservice: Pollingstationservice;
  
  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public fb: FormBuilder, private pollingstationservice: Pollingstationservice, private volunteerservice: Volunteerservice, private restSvc: RestService ) {
  this.navCtrl = navCtrl;
  this.volunteerservice = volunteerservice;
  this.pollingstationservice = pollingstationservice;
  this.regExPhone = '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]';
  //this.volunteerHere = null;
  this.restSvc = restSvc;
  this.loggedIn = false;
      

  this.loginForm = fb.group({  
            'enterPhoneNumber': ['', Validators.compose([Validators.required, Validators.pattern(this.regExPhone)])],
            'enterPasscode': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
  }


    onSubmit(value: any): void { 

        var that = this;
        try {
            that.restSvc.loginUser(value.enterPhoneNumber, value.enterPasscode)
                .subscribe( (data) => {
                    // that.properties = data;
                    // Expect response created here...
                    if (data.status == 200) {
                        console.log('successful call:' + data);
                        // this.restSvc.checkLoggedIn();
                        this.successForward(true);
                        return;
                    } else {
                        // ?? shouldn't happen ??
                        console.log('UNKNOWN STATUS:' + data);
                        this.error = true;
                        this.errorMessage = 'Unknown Error occurred attempting to login';
                        // 'We could not find your number in the system. Remember to enter only numbers (10 digits).'
                    }
                } , err => {
                    console.log('error occurred ' + err.toString());
                    that.error = true;
                    var subtitle;
                    if ((err.status == 0) ||
                        (err.status == 404)) {
                        this.successForward(false);
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
                }, () => {console.log('login complete')}
                          );
        } catch (err) {
            console.error(err);
            console.log('error in Submitting, exc='+ err.toString());
            this.errorMessage = err.toString();
            this.error = true;
        }

        // xxxxxx

        
        this.volunteerHere = 
            this.volunteerservice.getVolunteerbyPhoneNumber(value.enterPhoneNumber);

        if (!this.volunteerHere){
            this.error = true;
            this.errorMessage = 'We could not find your number in the system. Remember to enter only numbers (10 digits).'
            return;
        };
        

        /* if (this.volunteerHere.passcode==value.enterPasscode) */
        /* {
            this.loggedIn = true;
            this.restSvc.setLoggedIn(this.loggedIn);
            this.volunteerservice.setNewVolunteer(this.volunteerHere);
            try {
                
                this.navCtrl.push(AccountsettingsPage, {
                });
                
            } catch (EE) {
                console.log('error in Submitting, exc='+ EE.toString())
                console.log(EE.stack);
            } */
        /* } else {
            this.error = true;
            this.errorMessage = 'Incorrect password.'; 
        } */
    }

    successForward(real:boolean) {
        var that = this;
        if (!real) {
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
                alert.present();
            },250);
        }
        this.loggedIn = true;
        
        // this.restSvc.setLoggedIn(this.loggedIn);
        this.volunteerservice.setNewVolunteer(this.volunteerHere);
        if (this.volunteerHere.associatedPollingStationKey!=null){
        this.pollingstationservice.setStation(this.pollingstationservice.getPollingStationbyKey(this.volunteerservice.getNewVolunteerPollingStationKey()));
        }
        try {
            this.navCtrl.setRoot(AuthenticationPage);
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
            console.log(EE.stack);
        }
    }

    onResetPassword() {
        try {
            this.navCtrl.setRoot(ResetpasswordPage);
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
            console.log(EE.stack);
        }
    }

}
