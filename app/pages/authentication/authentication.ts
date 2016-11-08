import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
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
    this.onChangegeoLocation(null);

  }

  onChangegeoLocation(value){
      if (value == null) {

          Geolocation.getCurrentPosition().then((position) => {
              
              this.geoLocation = 
                  position.coords.latitude + ',' + 
                  position.coords.longitude;
              
          }, (err) => {
              if (err.code == 1) {
                  this.errorMessage = 'MUST allow Geo Location to be detected! ( ' + err.code + ' ) '+ err.message;
                  this.geoLocation = null; // unknown
                  this.errorMessage = this.errorMessage + ', You may need to refresh page, or restart App';
              } else {
                  this.errorMessage = 'Should allow Geo Location to be detected! ( ' + err.code + ' ) '+ err.toString();
                  this.geoLocation = '0,0'; // unknown            
              }
              console.log(err);
          });
      }
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
           this.errorMessage = 'All fields required';
           if ((!this.authenticatingVolunteerPasscode) || (!this.authenticatingVolunteerKey)) {
               this.errorMessage = this.errorMessage +  ' :Signing in requires two way authentication; please ask one of your team members to help you verify this record.';
           } else if (!this.affirm) {
               this.errorMessage = 'MUST check the confirmation box';
           } else if (!this.geoLocation) {
               this.errorMessage = 'MUST allow Geo Location to be detected! Try restarting App, or refreshing page with GeoLocation detection allowed';
           }
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
            // Expecting the string coming back from the server to say:
            // Authentication Success, ps=VAL
            // where VAL is the key for the associated polling station
            // We need to set that value
            var vol2 = that.volunteerservice.getVolunteerbyKeyXX
            (that.authenticatingVolunteerKey);
            var ps = vol2.associatedPollingStationKey;
            
            data = { _body: 'Authentication success, ps=' + ps };
        }

        // parse out polling station key from success string.
        var retstat = data._body;
        var eIdx = retstat.indexOf('ps=');
        var ps2 = retstat.substring(eIdx+3);

        // fill timesheet 
        that.newTimesheet = {
            volunteerKey: that.volunteerservice.getNewVolunteer().volunteerKey,
            authenticatingVolunteerKey: that.authenticatingVolunteerKey,
            checkInTime: that.time.toString(),
            checkOuttime: null,
            geoLocation: that.geoLocation,
        }
        var vol = that.volunteerservice.getNewVolunteer();
        if ((vol.shifts == null) || (vol.shifts.length == 0) ||
            (vol.associatedPollingStationKey == null) ||
            (vol.associatedPollingStationKey != ps2)) {
            // Update the shifts value to "now" to allow this one to authenticate.
            vol.shifts = 'now';
            vol.associatedPollingStationKey = ps2;
            // Attempt to Save the volunteer data..
            that.restSvc.saveObject('volunteers',vol,false,null,null,that);
        }
        that.recordservice.addTimesheetToList(that.newTimesheet);

        var pst = that.pollingstationservice.getPollingStationbyKey(ps2);
        that.pollingstationservice.setStation(pst);

        console.log(that.recordservice.getTimesheetList());

        let alertOne = that.alertCtrl.create({
            title: 'Successful Authentication',
            buttons: [{
                text: 'OK',
                handler: () => {
                    alertOne.dismiss();
                }
            }]
        });
        alertOne.present();

        // navigate 

        that.navCtrl.setRoot(SigninsuccessPage, {});

    }

    avFailureCb(that:any, err: any) {
        that.errorMessage = err._body;
        return;
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

