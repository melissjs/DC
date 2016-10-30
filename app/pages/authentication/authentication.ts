import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {Pollingstationservice} from '../../providers/pollingstationservice/pollingstationservice';
import {Volunteerservice} from '../../providers/volunteerservice/volunteerservice';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {SigninsuccessPage} from '../signinsuccess/signinsuccess';
import { Timesheet } from '../../timesheet';

/*
  Generated class for the AuthenticationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/authentication/authentication.html',
})
export class AuthenticationPage {
  pollingstationservice: Pollingstationservice;
  volunteerservice: Volunteerservice;
  recordservice: Recordservice;

  geoLocation: string;
  affirm: boolean;
  authenticatingVolunteerEmail: string;
  authenticatingVolunteerPasscode: string;
  authenticatingVolunteerKey: string;
  newTimesheet: Timesheet;
  date: Date;
  time: number;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, pollingstationservice: Pollingstationservice, volunteerservice: Volunteerservice, recordservice: Recordservice) {
    this.navCtrl = navCtrl;
    this.pollingstationservice = pollingstationservice;
    this.volunteerservice = volunteerservice;
    this.recordservice = recordservice;

    this.geoLocation = null;
    this.affirm = false;
    this.authenticatingVolunteerEmail = null;
    this.authenticatingVolunteerPasscode = null;
    this.authenticatingVolunteerKey = null;
    this.newTimesheet = this.recordservice.createVoidTimesheet();

  }

  onChangegeoLocation(value){
  this.geoLocation = value;
  }

  onChangeAffirmation(value){
  var newval = !value;
  this.affirm = newval;
  }

  onChangeAuthenticatingVolunteerEmail(value){
   this.authenticatingVolunteerEmail = value;
  }

  onChangeAuthenticatingVolunteerPasscode(value){
  this.authenticatingVolunteerPasscode = value;
  }

  onSubmit(){
    var that = this;
    this.date = new Date; 
    this.time = this.date.getTime();
    

     // make sure same volunteer is not authenticating 
         if (this.volunteerservice.getNewVolunteer().emailAddress == this.authenticatingVolunteerEmail){
                    let alertOne = this.alertCtrl.create({
                    title: 'Authentication cannot be done with only one volunteer.',
                    subTitle: 'Please ask a team member to help you authenticate this record by entering their email and passcode.',
                    buttons: ['OK']
                });
                alertOne.present();
                return;
                }

      // make sure all fields are present
       if (!this.authenticatingVolunteerPasscode || !this.geoLocation || !this.authenticatingVolunteerEmail || !this.affirm) {
                let alert = this.alertCtrl.create({
                    title: 'All fields required.',
                    subTitle: 'Signing in requires two way authentication; please ask one of your team members to help you verify this record.',
                    buttons: ['OK']
                });
                alert.present();
                return;
       }

        // verify email exists
                if (!this.volunteerservice.getVolunteerByEmail(this.authenticatingVolunteerEmail)){let alertEmailIncorrect = this.alertCtrl.create({
                    title: 'Authenticating Volunteer Email Invalid.',
                    subTitle: 'Please re-enter authenticating email.',
                    buttons: ['OK']
                });
                alertEmailIncorrect.present();
                return;}

       // verify credentials, get key
                if (this.volunteerservice.getVolunteerByEmail(this.authenticatingVolunteerEmail).passcode == this.authenticatingVolunteerPasscode){
                this.authenticatingVolunteerKey = this.volunteerservice.getVolunteerByEmail(this.authenticatingVolunteerEmail).volunteerKey;
                } else {
                    let alertEmail = this.alertCtrl.create({
                    title: 'Authenticating Volunteer Credentials Invalid.',
                    subTitle: 'Please re-enter authenticating email and passcode.',
                    buttons: ['OK']
                });
                alertEmail.present();
                return;
                }
        
        // fill timesheet 
        this.newTimesheet = {
        volunteerKey: this.volunteerservice.getNewVolunteer().volunteerKey,
        authenticatingVolunteerKey: this.volunteerservice.getVolunteerByEmail(this.authenticatingVolunteerEmail).volunteerKey,
        checkInTime: this.time.toString(),
        checkOuttime: null,
        geoLocation: this.geoLocation,
        }
        this.recordservice.addTimesheetToList(this.newTimesheet);
        console.log(this.recordservice.getTimesheetList());
        // navigate 

    that.navCtrl.setRoot(SigninsuccessPage, {});
  }

}
