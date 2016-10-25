import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Volunteer} from '../../volunteer';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import {RestService} from '../../providers/rest-service/rest-service';


@Component({
  templateUrl: 'build/pages/signinsuccess/signinsuccess.html',
})
export class SigninsuccessPage {
  volunteerservice: Volunteerservice;
  volunteerHere: Volunteer;

  constructor(private navCtrl: NavController, volunteerservice: Volunteerservice) {
    this.navCtrl = navCtrl;
    this.volunteerservice = volunteerservice;

    this.volunteerHere = this.volunteerservice.getNewVolunteer();
    console.log(this.volunteerservice.getNewVolunteer());
  }

}
