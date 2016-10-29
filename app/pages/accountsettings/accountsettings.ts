import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Volunteer} from '../../volunteer';
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
