import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Volunteer} from '../../volunteer';

import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import {RestService} from '../../providers/rest-service/rest-service';

@Component({
  templateUrl: 'build/pages/volunteerlist/volunteerlist.html',
    inputs: ['volunteer', 'team']
})
export class VolunteerlistPage {

currentVolunteer: Volunteer; 
volunteerservice: Volunteerservice;
currentTeamVolunteers: Volunteer[]; 
loggedIn: boolean;

  constructor(private navCtrl: NavController, volunteerservice: Volunteerservice, private restSvc: RestService) {
    this.navCtrl = navCtrl;
    this.volunteerservice = volunteerservice;
    this.loggedIn = this.restSvc.getLoggedIn();
    this.currentTeamVolunteers = this.volunteerservice.getTeamVolunteersByPollKey('ps1');
    //console.log('current team ' + this.currentTeam);
    //console.log('current team v ' + this.currentTeamVolunteers);
    //console.log('rthr ');

  

  }


}
