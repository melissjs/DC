import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { PollingStation } from '../../pollingstation';
import { Volunteer} from '../../volunteer';
//import { Team } from '../../team.ts';


// datalist
import { STATIONS } from '../../stationlist';

import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';


// pipes
//import { Searchpipe } from '../../pipes/searchpipe.ts';


@Injectable()
export class Pollingstationservice {
    selectedStation: PollingStation;
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
    //searchpipe: Searchpipe;

    constructor(){
        this.stationListInMemory = this.getStations();
        this.matchingPrecinctAndZipList = [];
        this.duplicateYesOrNo = false;
        //this.volunteerservice = volunteerservice;
    }

    getStations() { return STATIONS;  }

    setStation(passedValue){
        var that = this;
        this.selectedStation = passedValue;
        //return this.selectedStation;
    }

    getStation(){
        var that = this;
        return this.selectedStation;
        //return this.selectedStation;
    }

        getStationKey(){
        var that = this;
        return this.selectedStation.pollingStationKey;
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
        console.log('from service' + this.selectedStation.streetAddress)
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



}
