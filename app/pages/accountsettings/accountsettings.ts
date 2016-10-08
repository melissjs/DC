import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Volunteer} from '../../volunteer.ts';
import {VotePage} from '../vote/vote';


@Component({
  templateUrl: 'build/pages/accountsettings/accountsettings.html',
  inputs: ['volunteer']
})




export class AccountsettingsPage {

currentVolunteer: Volunteer; 


  constructor(private navCtrl: NavController) {
      this.navCtrl = navCtrl;

      this.currentVolunteer = 
      {
        "fullName":"Melissa Schwartz",
        "emailAddress":"melissjs@gmail.com",
        "phoneNumber":"602-524-5453",
        "age": 35,
        "sex": "Female",
        "partyAffiliation": "No Party Preference",    
        "shifts": "Morning, Evening",
        "passcode": "Eric help me!",
        "totalRecords": 6,
        "totalVoteRecords": 5,
        "totalAnomalyRecords": 0,
        "totalAmendmentRecords": 1
      }

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
