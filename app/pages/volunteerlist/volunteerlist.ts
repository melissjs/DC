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
currentTeam: Volunteer[]; 
loggedIn: boolean;

  constructor(private navCtrl: NavController, volunteerservice: Volunteerservice, private restSvc: RestService) {
    this.navCtrl = navCtrl;
    this.volunteerservice = volunteerservice;
    this.loggedIn = this.restSvc.getLoggedIn();
    this.currentTeam = this.volunteerservice.getTeamVolunteersByPollKey('ps1');
    console.log(this.currentTeam);

  }

}
