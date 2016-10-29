import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Volunteer} from '../../volunteer';
//import { Team } from '../../team';
//import {VotePage} from '../vote/vote';

import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import {RestService} from '../../providers/rest-service/rest-service';

@Component({
  templateUrl: 'build/pages/activityrecord/activityrecord.html',
  inputs: ['volunteer', 'team']
})
export class ActivityrecordPage {

currentVolunteer: Volunteer; 
currentTeam: Volunteer[];
volunteerservice: Volunteerservice;
totalRegisteredVolunteers: number;
totalTeamVoterRecords: number;
totalTeamAnomalyRecords: number;
totalTeamAmendmentRecords: number;
totalTeamNonVoterRecords: number;
totalTeamRecords: number;
totalIndividualRecords: number;

  constructor(private navCtrl: NavController,  volunteerservice: Volunteerservice, private restSvc: RestService) {
this.navCtrl = navCtrl;
this.volunteerservice = volunteerservice;


      this.currentVolunteer = 
       {
        "volunteerKey": "v3",
        "fullName":"Janice Row",
        "emailAddress":"janice@gmail.com",
        "exposeEmail": false,
        "phoneNumber":"6025245453",
        "age": 35,
        "sex": "Female",
        "partyAffiliation": "No Party Preference",    
        "shifts": "Early Evening, Late Evening",
        "passcode": "password",
        "associatedPollingStationKey": "ps2",
       
      
        }

        this.currentTeam = this.volunteerservice.getTeamVolunteersByPollKey(this.currentVolunteer.associatedPollingStationKey);

        this.volunteerservice.generateStationStats(this.currentVolunteer.associatedPollingStationKey);

        this.totalRegisteredVolunteers = this.volunteerservice.getVolunteerCount();
        this.totalTeamVoterRecords =  this.volunteerservice.getTotalTeamVoterRecords();
        this.totalTeamAnomalyRecords  = this.volunteerservice.getTotalTeamAnomalyRecords();
        this.totalTeamAmendmentRecords = this.volunteerservice.getTotalTeamAmendmentRecords();
        this.totalTeamNonVoterRecords = this.volunteerservice.getTotalTeamNonVoterRecords();
        this.totalTeamRecords = this.volunteerservice.getTotalTeamRecords();
        /*this.totalIndividualRecords = this.currentVolunteer.totalAmendmentRecords + this.currentVolunteer.totalAnomalyRecords + this.currentVolunteer.totalNonVoterRecords + this.currentVolunteer.totalVoteRecords;*/
  }

       onSubmit() {
        var that = this;
        try {
                //that.navCtrl.push(VotePage, {
                //});
            

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

}
