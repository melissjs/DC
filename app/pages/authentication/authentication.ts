import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {Pollingstationservice} from '../../providers/pollingstationservice/pollingstationservice';
import {Volunteerservice} from '../../providers/volunteerservice/volunteerservice';
import {RestService} from '../../providers/rest-service/rest-service';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {SigninsuccessPage} from '../signinsuccess/signinsuccess';
import { Timesheet } from '../../timesheet';

import * as globals from '../../globals';

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
  authenticatingVolunteerPasscode: string;
  authenticatingVolunteerKey: string;
  newTimesheet: Timesheet;
  date: Date;
  time: number;
  errorMessage: string;
  restSvc: RestService;
  chkBoxLabelState: number;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, 
              pollingstationservice: Pollingstationservice, 
              volunteerservice: Volunteerservice, recordservice: Recordservice,
              restSvc: RestService) {
    this.navCtrl = navCtrl;
    this.pollingstationservice = pollingstationservice;
    this.volunteerservice = volunteerservice;
    this.recordservice = recordservice;
    this.restSvc = restSvc;

    this.geoLocation = null;
    this.affirm = false;
    this.authenticatingVolunteerPasscode = null;
    this.authenticatingVolunteerKey = null;
    this.newTimesheet = this.recordservice.createVoidTimesheet();
    this.errorMessage = null;
    this.chkBoxLabelState = 0;
  }

  onChangegeoLocation(value){
  this.geoLocation = value;
  }

  onChangeAffirmation(value){
  var newval = !value;
  this.affirm = newval;
  }

    onChangeAuthenticatingVolunteerKey(value) {
        if (!value.match("[0-9][0-9]*")) {
            this.errorMessage = 'ERROR: Authenticating Key must be a number';
            this.authenticatingVolunteerKey = '';
        } else {
            this.authenticatingVolunteerKey = value;
        }
    }

    onChangeAuthenticatingVolunteerPasscode(value) {
        if (value.length < 8) {
            this.errorMessage = 'ERROR: Authenticating Password is less than 8 characters';
        }
        this.authenticatingVolunteerPasscode = value;
    }


  onSubmit(){
    var that = this;
    this.date = new Date; 
    this.time = this.date.getTime();
    
      // make sure all fields are present
       if (!this.authenticatingVolunteerPasscode || !this.geoLocation || !this.authenticatingVolunteerKey || !this.affirm) {
                let alert = this.alertCtrl.create({
                    title: 'All fields required.',
                    subTitle: 'Signing in requires two way authentication; please ask one of your team members to help you verify this record.',
                    buttons: ['OK']
                });
                alert.present();
                return;
       } else {

           this.restSvc.verifyExtraLogin
           (this.authenticatingVolunteerKey, this.authenticatingVolunteerPasscode, false,
            this.avSuccessCb, this.avFailureCb, this);


       }

  }

    avSuccessCb(that:any, real: boolean, data: any) {
        if (!real) {
            // For the fake scenario, just succeed
            var err = { status: 0, _body: ''};
            // otherwise success...
        }
        // fill timesheet 
        that.newTimesheet = {
            volunteerKey: that.volunteerservice.getNewVolunteer().volunteerKey,
            authenticatingVolunteerKey: that.authenticatingVolunteerKey,
            checkInTime: that.time.toString(),
            checkOuttime: null,
            geoLocation: that.geoLocation,
        }
	var vol = that.volunteerservice.getNewVolunteer();
	if ((vol.shifts == null) || (vol.shifts.length == 0)) {
	    // Update the shifts value to "now" to allow this one to authenticate.
	    vol.shifts = 'now';
	    // Attempt to Save the volunteer data..
	    that.restSvc.saveObject('volunteers',vol,false,null,null,that);
	}
        that.recordservice.addTimesheetToList(that.newTimesheet);
        console.log(that.recordservice.getTimesheetList());
    }

    avFailureCb(that:any, err: any) {
        that.errorMessage = err._body;
        return;
    }


    amFailureCb(that:any, errStr: string) {
        // Handle error to write amendment record...
        var title = 'Error Saving Amendment Record';
        let alert = that.alertCtrl.create({
            title: title,
            subTitle: errStr + ':Flush Data when connected to Internet',
            buttons: [{
                text: 'OK',
                handler: () => {
                    alert.dismiss();
                }
            }]
        });
        // navigate 

        that.navCtrl.setRoot(SigninsuccessPage, {});

    }

    amSuccessCb(that:any, real: boolean, data: any) {
        if (!real) {
            // act like success anyway..
        }
        let alertOne = that.alertCtrl.create({
            title: 'Successful Save of Time Sheet Record',
            buttons: ['OK']
        });
        alertOne.present();

        // navigate 

        that.navCtrl.setRoot(SigninsuccessPage, {});

    }

    getChkBoxLabelState() {
        var retval = 0;
        if ((this.pollingstationservice.getStation() != null) && (this.volunteerservice.getNewVolunteer() != null)) {
            retval = 2;
        } else if ((this.pollingstationservice.getStation() == null) || (this.volunteerservice.getNewVolunteer() == null)) {
            if (this.volunteerservice.getNewVolunteer() == null) {
                retval = 0;
            } else if (this.volunteerservice.getNewVolunteer() != null) {
                retval = 1;
            }
        }
        this.chkBoxLabelState = retval;
        return retval;
    }

}

