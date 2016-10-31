import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Volunteer} from '../../volunteer';
//import { Team } from '../../team';
//import {VotePage} from '../vote/vote';

import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import {RestService} from '../../providers/rest-service/rest-service';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {Pollingstationservice} from '../../providers/pollingstationservice/pollingstationservice';


@Component({
  templateUrl: 'build/pages/activityrecord/activityrecord.html',
  inputs: ['volunteer', 'team']
})
export class ActivityrecordPage {

currentVolunteer: Volunteer; 
currentTeam: Volunteer[];
volunteerservice: Volunteerservice;
recordservice: Recordservice;
pollingstationservice: Pollingstationservice;
totalRegisteredVolunteers: number;
totalTeamAffidavitRecords: number
totalTeamVoterRecords: number;
totalTeamAnomalyRecords: number;
totalTeamAmendmentRecords: number;
totalTeamNonVoterRecords: number;
totalIndividualNonVoteRecords: number;
totalTeamRecords: number;
totalIndividualAnomalyRecords: number;
totalIndividualRecords: number;
totalIndividualVoteRecords: number;
totalIndividualAffidavitRecords: number
totalIndividualAmendmentRecords: number;
totalTeamDemographicsRecords: number;
totalIndividualDemographicsRecords: number;
precinctNumber: string;

  constructor(private navCtrl: NavController, pollingstationservice: Pollingstationservice, recordservice: Recordservice,  volunteerservice: Volunteerservice, private restSvc: RestService) {
this.navCtrl = navCtrl;
this.volunteerservice = volunteerservice;
this.pollingstationservice = pollingstationservice;
this.recordservice = recordservice;
this.totalIndividualAnomalyRecords = 0;
this.totalTeamAnomalyRecords = 0;
this.totalTeamDemographicsRecords = 0;
this.totalIndividualDemographicsRecords = 0;
this.totalIndividualVoteRecords = 0;
this.totalTeamVoterRecords = 0;
this.totalIndividualNonVoteRecords = 0;
this.totalTeamNonVoterRecords = 0;
this.totalTeamRecords = 0;
this.totalIndividualRecords = 0;


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

        //individual
        this.precinctNumber = this.pollingstationservice.getPollingStationbyKey(this.currentVolunteer.associatedPollingStationKey).precinctNumber;

        this.currentTeam = this.volunteerservice.getTeamVolunteersByPollKey(this.currentVolunteer.associatedPollingStationKey);
        console.log(this.currentTeam);

        this.totalIndividualAffidavitRecords = this.recordservice.getTotalIndividualAffidavitRecords(this.currentVolunteer.volunteerKey);

        this.totalIndividualAnomalyRecords = this.recordservice.getTotalIndividualAnomalyRecords(this.currentVolunteer.volunteerKey);

        this.totalIndividualAmendmentRecords = this.recordservice.getTotalIndividualAmendmentRecords(this.currentVolunteer.volunteerKey);

        this.totalIndividualVoteRecords = this.recordservice.getTotalIndividualVoteRecords(this.currentVolunteer.volunteerKey);

        this.totalIndividualNonVoteRecords = this.recordservice.getTotalIndividualNonVoteRecords(this.currentVolunteer.volunteerKey);

        this.totalIndividualDemographicsRecords = this.recordservice.getTotalIndividualDemographicsRecords(this.currentVolunteer.volunteerKey);

        this.totalIndividualRecords = this.recordservice.getTotalIndividualRecords(this.currentVolunteer.volunteerKey);
        

        this.volunteerservice.generateStationStats(this.currentVolunteer.associatedPollingStationKey);

        this.totalRegisteredVolunteers = this.volunteerservice.getVolunteerCount();
        
        //team
        this.totalTeamAffidavitRecords = this.recordservice.getTotalTeamAffidavitRecords(this.currentTeam);
        this.totalTeamVoterRecords =  this.recordservice.getTotalTeamVoteRecords(this.currentTeam);
        this.totalTeamAnomalyRecords  = this.recordservice.getTotalTeamAnomalyRecords(this.currentTeam);
        this.totalTeamAmendmentRecords = this.recordservice.getTotalTeamAmendmentRecords(this.currentTeam);
        this.totalTeamNonVoterRecords = this.recordservice.getTotalTeamNonVoteRecords(this.currentTeam); 
        this.totalTeamDemographicsRecords = this.recordservice.getTotalTeamDemographicsRecords(this.currentTeam);
        this.totalTeamRecords = this.recordservice.getTotalTeamRecords(this.currentTeam);
        
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
