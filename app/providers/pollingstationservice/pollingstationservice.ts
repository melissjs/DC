import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { PollingStation } from '../../pollingstation';
import { Volunteer} from '../../volunteer';
//import { Team } from '../../team.ts';


// datalist
import { STATIONS } from '../../fakedata';

import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';


// pipes
//import { Searchpipe } from '../../pipes/searchpipe.ts';


@Injectable()
export class Pollingstationservice {
    selectedStationXX: PollingStation;
    oldStation: PollingStation;
    stationListInMemory: PollingStation[];
    associatedVolunteerKeyList: string[];
    matchingPrecinctAndZipList: PollingStation[];
    duplicateYesOrNo: boolean;
    volunteerCount: number;
    shiftsToFill: number;
    shiftsFilled: number;
    volunteerservice: Volunteerservice;
    associatedVolunteerArray: Volunteer[];
    usingReal: boolean;

    //searchpipe: Searchpipe;

    constructor(){
        this.usingReal = false;
        this.stationListInMemory = this.getStations();
        this.matchingPrecinctAndZipList = [];
        this.duplicateYesOrNo = false;
        //this.volunteerservice = volunteerservice;
    }

    getStations() {
        if (!this.usingReal) {
            if (this.stationListInMemory == null) {
                this.stationListInMemory = STATIONS;
            }
        }
        return this.stationListInMemory;
    }

    addPollingStations(data: any) {
        // returns the most recently modified date to use
        // on the next query.
        var lastDate = null;
        if ((!this.usingReal) ||
            ((this.stationListInMemory == null) && (data != null))) {
            // If we are using the "fake" data, change now to use real data.
            this.stationListInMemory = data;
            this.usingReal = true;
            // from now on, we will just add to this.
        } else if ((this.stationListInMemory != null) &&
                   (data != null)) {
            // go through the stationListInMemory, and
            // see about adding the data to it.
            var curPoll = null;
            var thisList = this.stationListInMemory;
            for (var ii=0;ii<data.length;ii++) {
                curPoll = data[ii];
                var key=curPoll.pollingStationKey;
                var pollChk = null;
                var found = false;
                for (var jj=0;jj<thisList.length;jj++) {
                    pollChk = thisList[jj];
                    var keyChk= pollChk.pollingStationKey;
                    if (keyChk == key) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    // Didn't find this one.. add it.
                    this.stationListInMemory.push(curPoll);
                }
            }
        }
        var thisList = this.stationListInMemory;
        var pollChk = null;
        for (var kk=0;kk<thisList.length;kk++) {
            pollChk = thisList[kk];
            var modDateChk=pollChk.modifiedDate;
            if ((lastDate == null) || (lastDate < modDateChk)) {
                lastDate = modDateChk;
            }
        }
        // Now return the "latest" date
        // set a break here..
        return lastDate;
    }

    setStation(passedValue){
        var that = this;
        this.selectedStationXX = passedValue;
        //return this.selectedStation;
    }

    getStation(){
        var that = this;
        return this.selectedStationXX;
        //return this.selectedStation;
    }

    generatePollingStationKey(){
        return 'ps'+(this.stationListInMemory.length+1);
    }

    getPollingStationbyKey(passedKey){ 
        for (var i = 0; i < this.stationListInMemory.length; i++){
            if (this.stationListInMemory[i].pollingStationKey == passedKey){
                return this.stationListInMemory[i]
            }
        }
        return null;
    }




   /* isCurrentVolunteerInArray(passedVolunteer){

        for (var i = 0; i < this.selectedStation.associatedVolunteerKeyList.length; i++) {
            if (this.selectedStation.associatedVolunteerKeyList[i] == passedVolunteer.volunteerKey){
                console.log(this.selectedStation.associatedVolunteerKeyList[i] + passedVolunteer.volunteerKey);

                return true;
            } 
        }
        return false; 
    } */

 /*   removeVolunteerFromAssociatedVolunteerList(passedVolunteer: Volunteer, stationKey: string){
        this.oldStation = this.getPollingStationbyKey(stationKey);
        for (var i = 0; i < this.oldStation.associatedVolunteerKeyList.length; i++) {
            if (this.oldStation.associatedVolunteerKeyList[i] == passedVolunteer.volunteerKey){
                this.oldStation.associatedVolunteerKeyList.splice(i, 1);
            }
        }
    }*/

    /*  removeVolunteerFromOldStationAssociatedVolunteerList(passedVolunteer, oldStation){
        for (var i = 0; i < this.oldStation.associatedVolunteerList.length; i++) {
        if (this.oldStation.associatedVolunteerList[i].emailAddress == passedVolunteer.emailAdress){
        this.oldStation.associatedVolunteerList.splice(i, 1);
        }
        }
        }*/


   /* addVolunteerToAssociatedVolunteerList(passedVolunteer){
        this.selectedStation.associatedVolunteerKeyList.push(passedVolunteer.volunteerKey);
        //return this.selectedStation;
    }*/

    printSelectedStation(){
        console.log('from service' + this.selectedStationXX.streetAddress)
    }

    //notchecked
   /* getAssociatedVolunteerKeyList(passedStationKey){
        this.associatedVolunteerKeyList = this.getPollingStationbyKey(passedStationKey).associatedVolunteerKeyList;
        return this.associatedVolunteerKeyList;
    }*/

    //printSelectedStations(){
    //console.log('from service hello')
    //}


    // Compare precint number and zip for navigating to duplicate station pages
duplicateStationSearch(passedPrecint: string, passedZip: number){
    // starting with clear comparison array 
    this.matchingPrecinctAndZipList = [];
    this.duplicateYesOrNo = false;
      // GET ALL STATIONS WITH THAT PRECINT
      for (var i=0; i < this.stationListInMemory.length; i++){
          if(this.stationListInMemory[i].precinctNumber == passedPrecint){
              // fill array will all those stations with matching precints
              if(this.stationListInMemory[i].zip == passedZip){
                  this.matchingPrecinctAndZipList.push(this.stationListInMemory[i]);
                  this.duplicateYesOrNo =  true;
              }
          }
      }
    if (this.duplicateYesOrNo == true){
                  //console.log(this.matchingPrecinctAndZipList[0]);
        return true;
    } else {
    this.duplicateYesOrNo = false;
    return false;
    }
}

// Only applicable to DC app

isThisInState(state){
    var stateUpper = this.selectedStationXX.state.toUpperCase();
    state = state.toUpperCase();
    var isInState = false;
    switch (state) {
    case 'FL':
	isInState = (stateUpper == 'FL') || (stateUpper == 'FLORIDA');
	break;
    default:
	isInState = (stateUpper == state);
    }
    return isInState;
}



}
