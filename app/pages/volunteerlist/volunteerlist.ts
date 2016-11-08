import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Volunteer} from '../../volunteer';

import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import {RestService} from '../../providers/rest-service/rest-service';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {CheckLogin } from '../../components/check-login/check-login';

@Component({
  templateUrl: 'build/pages/volunteerlist/volunteerlist.html',
  directives: [CheckLogin],
    // inputs: ['volunteer', 'team']
})
export class VolunteerlistPage {

    currentVolunteer: Volunteer; 
    volunteerservice: Volunteerservice;
    currentTeam: Volunteer[]; 
    initialized: boolean;

    constructor(private navCtrl: NavController, volunteerservice: Volunteerservice, 
		private restSvc: RestService, private recordservice: Recordservice) {
	this.navCtrl = navCtrl;
	this.volunteerservice = volunteerservice;
	this.initialized = false;
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

	this.currentTeam = this.volunteerservice.getAssociatedVolunteers();
	this.initialized = true;
    }

    onRefresh() {
	this.initializeStuff();
    }

}
