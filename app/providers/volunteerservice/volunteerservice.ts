import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// interfaces
import { Volunteer} from '../../volunteer';
import { PollingStation } from '../../pollingstation';

// station json array
import { VOLUNTEERS } from '../../volunteerlist';
import * as globals from '../../globals';

//other service
import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice';

import {RestService} from '../../providers/rest-service/rest-service';



@Injectable()
export class Volunteerservice {
    currentVolunteer: Volunteer;
    exposedYesOrNo: string;
    oldStation: PollingStation;
    pollingstationservice: Pollingstationservice;
    volunteerListInMemory: Volunteer[];
    volunteersByStation: Volunteer[];
    buildString: string;
    notRegistered: string;
    teamKeyList: string[];
    associatedVolunteerArray: Volunteer[];
    tempVolunteer: Volunteer;
    restSvc: RestService;
    volunteerCount: number;
    shiftsToFill: number;
    shiftsFilled: number;
    totalTeamVoterRecords: number;
    totalTeamAnomalyRecords: number;
    totalTeamAmendmentRecords: number;
    totalTeamNonVoterRecords: number;
    totalTeamRecords: number;

    constructor(pollingstationservice: Pollingstationservice, restSvc: RestService) {
        this.currentVolunteer = null;
        this.pollingstationservice = pollingstationservice;
        this.restSvc = restSvc;
        this.volunteerListInMemory = VOLUNTEERS;
        this.notRegistered = "None";
        this.associatedVolunteerArray = [];
        this.shiftsFilled = 0;
        this.totalTeamVoterRecords = 0;
        this.totalTeamAnomalyRecords = 0;
        this.totalTeamAmendmentRecords = 0;
        this.totalTeamNonVoterRecords = 0;
        this.totalTeamRecords = 0;
        // if no one is logged in create void volunteer 
        this.restSvc.checkLoggedIn(this.setLoginTrue, this.setLoginFalse,this);


    }
    
    setLoginTrue(that) {
        // this.loggedIn = true;  no op
    }

    setLoginFalse(that) {
        // this.loggedIn = false;
        that.currentVolunteer = that.setToVoidVolunteer();
    }
    
    getVolunteers() { return this.volunteerListInMemory;  }

    generateVolunteerKey(){
        return 'v'+(this.volunteerListInMemory.length+1);
    }
    
    setNewVolunteer(value){
        var that = this;
        this.currentVolunteer = value;

                //for testing only
        this.currentVolunteer = {
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

    getNewVolunteer(){
        return this.currentVolunteer;
    }

    getNewVolunteerKey(){
        return this.currentVolunteer.volunteerKey;
    }

    getNewVolunteerPollingStationKey(){
        return this.currentVolunteer.associatedPollingStationKey;
    }
    setPollingStationForVolunteer(value){
        this.currentVolunteer.associatedPollingStationKey = value.pollingStationKey;
    }

    hasPollingStation(passedVolunteer){
        if(this.currentVolunteer.associatedPollingStationKey != null)
            return true;
    }

    clearShifts() {
        this.currentVolunteer.shifts = '';
    }

    setShifts(passedString){
        //this.currentVolunteer.shifts = passedString;
        if (!this.currentVolunteer.shifts.includes(passedString)) {
            if (this.currentVolunteer.shifts != '') {
                this.currentVolunteer.shifts = this.currentVolunteer.shifts + ", " + passedString;
            } else {
                this.currentVolunteer.shifts = passedString;
            }
        }
    }

    printVolunteer(passedVolunteer){
    console.log('Name: ' + passedVolunteer.fullName + ' Email: ' + passedVolunteer.emailAddress + ' Exposed: ' + passedVolunteer.exposeEmail + ' Cell: ' + passedVolunteer.phoneNumber + ' Age: ' + passedVolunteer.age + ' Sex: ' + passedVolunteer.sex + ' Party: ' + passedVolunteer.partyAffiliation + ' Shifts: ' + passedVolunteer.shifts+ ' Code: ' + passedVolunteer.passcode);
    }


    printShifts(passedVolunteer){
        if (this.currentVolunteer.shifts != '') {
            return this.currentVolunteer.shifts;
        } else {
            console.log(this.notRegistered);
            return this.notRegistered;
        }
    }
    

    addCurrentVolunteerToList(passedVolunteer){
        this.volunteerListInMemory.push(passedVolunteer);
    }

    deleteCurrentVolunteerFromList(passedVolunteer){
        for (var i = 0; i < this.volunteerListInMemory.length; i++){
            if (passedVolunteer.volunteerKey == this.volunteerListInMemory[i].volunteerKey){
                this.volunteerListInMemory.splice(i,1);
            } else { console.log("The volunteer was not in the list.")}
        } 
    }






    overWriteChangesToVolunteer(passedVolunteer){
        for (var i = 0; i < this.volunteerListInMemory.length; i++){
            if (passedVolunteer.volunteerKey == this.volunteerListInMemory[i].volunteerKey){
                this.volunteerListInMemory[i] = passedVolunteer;
                //console.log(passedVolunteer.volunteerKey + " matches " + this.volunteerListInMemory[i].volunteerKey);
            } else { //console.log(passedVolunteer.volunteerKey + " is not " + this.volunteerListInMemory[i].volunteerKey);
            
        }
        } 
    }


    isEmailExposed(passedVolunteer){
        this.currentVolunteer = passedVolunteer;
        if(this.currentVolunteer.exposeEmail == true){
            this.exposedYesOrNo = "Yes";
        }

        if(this.currentVolunteer.exposeEmail == false){
            this.exposedYesOrNo = "No";
        }
        return this.exposedYesOrNo;
    } 

    getVolunteerbyKey(passedKey){ 
        for (var i = 0; i < this.volunteerListInMemory.length; i++){
            if (this.volunteerListInMemory[i].volunteerKey == passedKey){
                return this.volunteerListInMemory[i]
            }
        }
        return null;
    }

    getVolunteerByEmail(passedEmail){
        for (var i = 0; i < this.volunteerListInMemory.length; i++){
            if (this.volunteerListInMemory[i].emailAddress == passedEmail){
                return this.volunteerListInMemory[i]
            }
        }
        return null;
    }

        getVolunteerbyPhoneNumber(passedPhoneNumber){ 
        for (var i = 0; i < this.volunteerListInMemory.length; i++){
            if (this.volunteerListInMemory[i].phoneNumber == passedPhoneNumber){
                return this.volunteerListInMemory[i]
            }
        }
        return null;
    }
    
    getVolunteersByStationAndShift(selectedStationKey, passedShift){
        var volunteersByStationAndShift = [];
        for (var i = 0; i < this.volunteerListInMemory.length; i++){
            var vol = this.volunteerListInMemory[i];
            if ((vol.associatedPollingStationKey == selectedStationKey) && 
                (vol.shifts.includes(passedShift))) {
                volunteersByStationAndShift.push(vol);
            }
        }
        return volunteersByStationAndShift;
    }


    getVolunteerArrayByKeyList(passedKeyList){
            //this.associatedVolunteerArray = [];
        for ( var i=0; i < passedKeyList.length; i++){
            this.tempVolunteer = this.getVolunteerbyKey(passedKeyList[i]);
            this.associatedVolunteerArray.push(this.tempVolunteer);
        }
        return this.associatedVolunteerArray;
    }

   /* printVolunteerKeysFromList(){
         for ( var i=0; i < this.volunteerListInMemory.length; i++){
             console.log(this.volunteerListInMemory[i].fullName);
             console.log(this.volunteerListInMemory[i].volunteerKey);
         }
    }*/

    getTeamKeyList(passedPollKey){
        this.teamKeyList = []; // zero out to mitigate duplicates
        for (var i = 0; i < this.volunteerListInMemory.length; i++){
            if (this.volunteerListInMemory[i].associatedPollingStationKey == passedPollKey){
                this.teamKeyList.push(this.volunteerListInMemory[i].volunteerKey)
            }
        }
        return this.teamKeyList;
    }

    getTeamVolunteersByPollKey(passedPollKey){
        return this.getVolunteerArrayByKeyList(this.getTeamKeyList(passedPollKey));

    }

    getShiftCountFromString(shiftString) { 
    return shiftString.split(" ").length;
    }

    // begin shifts


    checkEarlyMorning(passedShifts){
        return (passedShifts.includes(globals.EARLY_MORNING));
    }

    checkLateMorning(passedShifts){
        return (passedShifts.includes(globals.LATE_MORNING));
    }

    checkEarlyAfternoon(passedShifts){
        return (passedShifts.includes(globals.EARLY_AFTERNOON));
    }

    checkLateAfternoon(passedShifts){
        return (passedShifts.includes(globals.LATE_AFTERNOON));
    }

    checkEarlyEvening(passedShifts){
        return (passedShifts.includes(globals.EARLY_EVENING));
    }

    checkLateEvening(passedShifts){
        return (passedShifts.includes(globals.LATE_EVENING));
    }


    setToVoidVolunteer(){
            this.currentVolunteer = {
            volunteerKey: '',
            fullName: '',
            emailAddress: '',
            exposeEmail: false,
            phoneNumber: '',
            age: null,
            sex: '',
            partyAffiliation: '',
            shifts:'', 
            passcode: '',
            associatedPollingStationKey: null, 
            
        }
        return this.currentVolunteer;
    }

generateStationStats(passedStationKey){
    this.associatedVolunteerArray = [];
    //get array all volunteers with same station key
    this.associatedVolunteerArray = this.getTeamVolunteersByPollKey(passedStationKey);
    //return array length
    this.volunteerCount = this.associatedVolunteerArray.length;
    //count and aggregate each of their shift array lengths = filledShifts
    this.shiftsFilled = 0;
    for (var i=0; i < this.associatedVolunteerArray.length; i++){
        this.shiftsFilled += this.getShiftCountFromString(this.associatedVolunteerArray[i].shifts);
    }

    
    this.shiftsFilled = this.shiftsFilled/2;
     this.shiftsToFill = 45 - this.shiftsFilled;
     
     /*//generate total voter records
     this.totalTeamVoterRecords = 0;
      for (var i=0; i < this.associatedVolunteerArray.length; i++){
        this.totalTeamVoterRecords += this.associatedVolunteerArray[i].totalVoteRecords;
    }
    //generate total anomaly records
    this.totalTeamAnomalyRecords = 0;
     for (var i=0; i < this.associatedVolunteerArray.length; i++){
        this.totalTeamAnomalyRecords += this.associatedVolunteerArray[i].totalAnomalyRecords;
    }
    //generate total amendment records
    this.totalTeamAmendmentRecords = 0;
     for (var i=0; i < this.associatedVolunteerArray.length; i++){
        this.totalTeamAmendmentRecords += this.associatedVolunteerArray[i].totalAmendmentRecords;
    }

    //generate total non voter records
    this.totalTeamNonVoterRecords = 0;
     for (var i=0; i < this.associatedVolunteerArray.length; i++){
        this.totalTeamNonVoterRecords += this.associatedVolunteerArray[i].totalNonVoterRecords;
    }


    //total all records
    this.totalTeamRecords =  this.totalTeamVoterRecords + this.totalTeamAnomalyRecords + this.totalTeamAmendmentRecords + this.totalTeamNonVoterRecords;*/

}


// not in use

getVolunteerCount(){
return this.volunteerCount;
}

getShiftsToFill(){
return this.shiftsToFill;
}

getShiftsFilled(){
return this.shiftsFilled
}

getTotalTeamVoterRecords(){
return this.totalTeamVoterRecords;
}

getTotalIndividualAnomalyRecords(){
return this.totalTeamAnomalyRecords;
}

getTotalTeamAnomalyRecords(){
return this.totalTeamAnomalyRecords;
}

getTotalTeamAmendmentRecords(){
return this.totalTeamAmendmentRecords;
}

getTotalTeamNonVoterRecords (){
return this.totalTeamNonVoterRecords;
}

getTotalTeamRecords(){
return this.totalTeamRecords;
}

}


