import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Volunteer} from '../../volunteer';
//import { Team } from '../../team';
//import {VotePage} from '../vote/vote';

import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import {RestService} from '../../providers/rest-service/rest-service';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {Pollingstationservice} from '../../providers/pollingstationservice/pollingstationservice';
import {CheckLogin } from '../../components/check-login/check-login';

@Component({
  templateUrl: 'build/pages/activityrecord/activityrecord.html',
  directives: [CheckLogin],
    // inputs: ['volunteer', 'team']
})
export class ActivityrecordPage {

    currentVolunteer: Volunteer; 
    currentTeam: Volunteer[];
    volunteerservice: Volunteerservice;
    recordservice: Recordservice;
    pollingstationservice: Pollingstationservice;
    totalRegisteredVolunteers: number;
    totalActiveVolunteers: number;

    /* not using team stuff now
       totalTeamAffidavitRecords: number
       totalTeamVoterRecords: number;
       totalTeamAnomalyRecords: number;
       totalTeamAmendmentRecords: number;
       totalTeamNonVoterRecords: number;
       totalTeamRecords: number;
       totalTeamDemographicsRecords: number;
    */

    totalIndividualAnomalyRecords: number;
    totalIndividualRecords: number;
    totalIndividualVoteRecords: number;
    totalIndividualNonVoteRecords: number;
    totalIndividualAffidavitRecords: number
    totalIndividualAmendmentRecords: number;
    totalIndividualDemographicsRecords: number;

    precinctNumber: string;
    initialized: boolean;

    constructor(private navCtrl: NavController, pollingstationservice: Pollingstationservice, recordservice: Recordservice,  volunteerservice: Volunteerservice, private restSvc: RestService) {
	this.navCtrl = navCtrl;
	this.volunteerservice = volunteerservice;
	this.pollingstationservice = pollingstationservice;
	this.recordservice = recordservice;
	this.totalIndividualAnomalyRecords = 0;
	this.totalIndividualDemographicsRecords = 0;
	this.totalIndividualVoteRecords = 0;
	this.totalIndividualNonVoteRecords = 0;
	this.totalIndividualRecords = 0;

	/* Not using team stuff for now 
	   this.totalTeamAnomalyRecords = 0;
	   this.totalTeamDemographicsRecords = 0;
	   this.totalTeamVoterRecords = 0;
	   this.totalTeamNonVoterRecords = 0;
	   this.totalTeamRecords = 0;
	*/

	this.initialized = false;

	/*
	  this.currentVolunteer = 
	  {
          "volunteerKey": "v1",
          "fullName":"Janice Row",
          "emailAddress":"janice@gmail.com",
          "exposeEmail": false,
          "phoneNumber":"6025245453",
          "age": 35,
          "sex": "Female",
          "partyAffiliation": "No Party Preference",    
          "shifts": "Early Evening, Late Evening",
          "associatedPollingStationKey": "ps2",
          }
	*/

	this.initializeStuff();

    }

    initializeStuff() {

	if (this.recordservice.getAuthenticatingVolunteerKey() == null) {
	    return;
	}

	this.currentVolunteer = this.volunteerservice.getNewVolunteer();

	if (this.currentVolunteer == null) {
	    // obviously not yet logged in..  exit.
	    return;
	}
	//individual

	var pollingStationKey = this.currentVolunteer.associatedPollingStationKey;
	if (pollingStationKey == null) {
	    return;
	}
	var pollingStation = this.pollingstationservice.getPollingStationbyKey(pollingStationKey);
	if (pollingStation == null) {
	    return;
	}

        this.precinctNumber = pollingStation.precinctNumber;

        this.currentTeam = this.volunteerservice.getAssociatedVolunteers();
	// this.volunteerservice.getTeamVolunteersByPollKey(this.currentVolunteer.associatedPollingStationKey);

        console.log(this.currentTeam);

        this.totalIndividualAffidavitRecords = this.recordservice.getTotalIndividualAffidavitRecords(/* this.currentVolunteer.volunteerKey */);

        this.totalIndividualAnomalyRecords = this.recordservice.getTotalIndividualAnomalyRecords(/* this.currentVolunteer.volunteerKey */);

        this.totalIndividualAmendmentRecords = this.recordservice.getTotalIndividualAmendmentRecords(/* this.currentVolunteer.volunteerKey */);

        this.totalIndividualVoteRecords = this.recordservice.getTotalIndividualVoteRecords(/* this.currentVolunteer.volunteerKey */);

        this.totalIndividualNonVoteRecords = this.recordservice.getTotalIndividualNonVoteRecords(/* this.currentVolunteer.volunteerKey */);

        this.totalIndividualDemographicsRecords = this.recordservice.getTotalIndividualDemographicsRecords(/* this.currentVolunteer.volunteerKey */);

        this.totalIndividualRecords = this.recordservice.getTotalIndividualRecords(/* this.currentVolunteer.volunteerKey */);
        

        this.volunteerservice.generateStationStats( /* this.currentVolunteer.associatedPollingStationKey */);

        this.totalRegisteredVolunteers = this.volunteerservice.getVolunteerCount();
	this.totalActiveVolunteers = this.volunteerservice.getVolunteersActive();
        
        //team  NOT USING Now.
	/* 
           this.totalTeamAffidavitRecords = this.recordservice.getTotalTeamAffidavitRecords(this.currentTeam);
           this.totalTeamVoterRecords =  this.recordservice.getTotalTeamVoteRecords(this.currentTeam);
           this.totalTeamAnomalyRecords  = this.recordservice.getTotalTeamAnomalyRecords(this.currentTeam);
           this.totalTeamAmendmentRecords = this.recordservice.getTotalTeamAmendmentRecords(this.currentTeam);
           this.totalTeamNonVoterRecords = this.recordservice.getTotalTeamNonVoteRecords(this.currentTeam); 
           this.totalTeamDemographicsRecords = this.recordservice.getTotalTeamDemographicsRecords(this.currentTeam);
           this.totalTeamRecords = this.recordservice.getTotalTeamRecords(this.currentTeam);
	*/
	this.initialized = true;
    }

    onRefresh() {
	this.initializeStuff();
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
