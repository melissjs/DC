import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Volunteer} from '../../volunteer.ts';
import { Team } from '../../team.ts';


@Component({
  templateUrl: 'build/pages/volunteerlist/volunteerlist.html',
    inputs: ['volunteer', 'team']
})
export class VolunteerlistPage {

currentVolunteer: Volunteer; 
currentTeam: Team;

  constructor(private navCtrl: NavController) {

      this.currentTeam =
      {
        "precinctNumber": "9001A",
        "streetAddress": "515 Almont Drive",
        "city": "Los Angeles",
        "state": "California",
        "zip": 90025,
        "volunteerList": [{
                
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
      
        },      {
        "fullName":"Eric Hillis",
        "emailAddress":"eric@hillis.com",
        "phoneNumber":"310-222-3333",
        "age": 40,
        "sex": "Male",
        "partyAffiliation": "No Party Preference",    
        "shifts": "Afternoon",
        "passcode": "Code",
        "totalRecords": 6,
        "totalVoteRecords": 5,
        "totalAnomalyRecords": 0,
        "totalAmendmentRecords": 1
      }],
        "geoLocation": "1582:1901",
        "photoIndex": "LACA900259001A",
        "totalRegisteredVolunteers": 24,
        "totalActiveVolunteers": 8,
        "totalRecords": 61,
        "totalVoteRecords": 55,
        "totalAnomalyRecords": 4,
        "totalAmendmentRecords": 2
      }

  }

}
