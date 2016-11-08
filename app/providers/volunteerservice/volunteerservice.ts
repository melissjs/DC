import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// interfaces
import { Volunteer} from '../../volunteer';
import { PollingStation } from '../../pollingstation';

// station json array
import { VOLUNTEERS } from '../../fakedata';
import * as globals from '../../globals';

//other service
// import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice';

// import {RestService} from '../../providers/rest-service/rest-service';



@Injectable()
export class Volunteerservice {
    currentVolunteer: Volunteer;
    exposedYesOrNo: string;
    oldStation: PollingStation;
    // pollingstationservice: Pollingstationservice;
    volunteerListInMemory: Volunteer[];
    volunteersByStation: Volunteer[];
    buildString: string;
    notRegistered: string;
    teamKeyList: string[];
    associatedVolunteerArray: Volunteer[];
    tempVolunteer: Volunteer;
    // restSvc: RestService;
    volunteerCount: number;
    shiftsToFill: number;
    shiftsFilled: number;
    usingReal: boolean;
    activeVolunteers: number;

    constructor(/* pollingstationservice: Pollingstationservice, restSvc: RestService */) {
        this.currentVolunteer = null;
        // this.pollingstationservice = pollingstationservice;
        // this.restSvc = restSvc;
        this.volunteerListInMemory = null; // set VOLUNTEERS; later (if at all)
        this.notRegistered = "None";
        this.associatedVolunteerArray = [];
        this.shiftsFilled = 0;
        this.usingReal = false;
	this.activeVolunteers = 1; // this volunteer for now..

        // if no one is logged in creat void volunteer 
        // this.restSvc.checkLoggedIn(this.setLoginTrue, this.setLoginFalse,this);
    }
    
    /*
    setLoginTrue(that) {
        // this.loggedIn = true;  no op
    }

    setLoginFalse(that) {
        // this.loggedIn = false;
        that.currentVolunteer = that.setToVoidVolunteer();
    }
    */
    
    getVolunteers() {
        if (!this.usingReal) {
            if (this.volunteerListInMemory == null) {
                this.volunteerListInMemory = VOLUNTEERS;
            }
        }
        return this.volunteerListInMemory;
    }

    /* 
       Added the following function to properly set the volunteers
       associated with a specific polling station.  It is populated 
       by the RestService
       */
    setVolunteers(data: any, real: boolean) {
        this.associatedVolunteerArray = data;
        this.usingReal = real;
    }

    // ONLY CALLED IN FAKE test (see unregisteredsignin.ts)
    generateVolunteerKey(){
        var key = null;
        if (this.checkUsingFake()) {
            key = 'v'+(this.volunteerListInMemory.length+1); 
        } else {
            key = 'v' + Math.floor((Math.random() * 10000000));
        }
        return key;
    }
    
    setNewVolunteer(value){
        this.currentVolunteer = value;
    }

    getNewVolunteer(){
        return this.currentVolunteer;
    }

    setPollingStationForVolunteer(value){
        if (value == null) {
            this.currentVolunteer.associatedPollingStationKey = value;
        } else {
            this.currentVolunteer.associatedPollingStationKey = value.pollingStationKey
        }
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
    

    checkUsingFake() {
        if (this.volunteerListInMemory == null) {
            if (this.usingReal) {
                console.log('ERROR! shows using real but calling fake procedure!');
                return false;
            }
            this.getVolunteers();
        }
        return true;
    }


    // ONLY CALLED IN FAKE test (see unregisteredsignin.ts)
    addCurrentVolunteerToList(passedVolunteer){
        if (this.checkUsingFake()) {
            this.volunteerListInMemory.push(passedVolunteer);
        }
    }

    deleteCurrentVolunteerFromListXX(passedVolunteer){
        if (this.volunteerListInMemory) {
            for (var i = 0; i < this.volunteerListInMemory.length; i++){
                if (passedVolunteer.volunteerKey == this.volunteerListInMemory[i].volunteerKey){
                    this.volunteerListInMemory.splice(i,1);
                } else { console.log("The volunteer was not in the list.")}
            } 
        }
    }


    overWriteChangesToVolunteer(passedVolunteer){
        if (this.volunteerListInMemory) {
            for (var i = 0; i < this.volunteerListInMemory.length; i++){
                if (passedVolunteer.volunteerKey == this.volunteerListInMemory[i].volunteerKey){
                    this.volunteerListInMemory[i] = passedVolunteer;
                    //console.log(passedVolunteer.volunteerKey + " matches " + this.volunteerListInMemory[i].volunteerKey);
                } else { //console.log(passedVolunteer.volunteerKey + " is not " + this.volunteerListInMemory[i].volunteerKey);
                }
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

    // Only should be used in fake instance..
    getVolunteerbyKeyXX(passedKey){ 
        if (this.volunteerListInMemory) {
            for (var i = 0; i < this.volunteerListInMemory.length; i++){
                if (this.volunteerListInMemory[i].volunteerKey == passedKey){
                    return this.volunteerListInMemory[i]
                }
            }
        }
        return null;
    }

    getVolunteerByEmailXX(passedEmail){
        if (this.volunteerListInMemory) {
            for (var i = 0; i < this.volunteerListInMemory.length; i++){
                if (this.volunteerListInMemory[i].emailAddress == passedEmail){
                    return this.volunteerListInMemory[i]
                }
            }
        }
        return null;
    }

    // ONLY CALLED IN FAKE test (see rest-service.ts)
    getVolunteerbyPhoneNumber(passedPhoneNumber:string){ 
        if (this.checkUsingFake()) {
            for (var i = 0; i < this.volunteerListInMemory.length; i++){
                if (this.volunteerListInMemory[i].phoneNumber == passedPhoneNumber){
                    return this.volunteerListInMemory[i]
                }
            }
        }
        return null;
    }
    
    getVolunteersByShift(passedShift){
        var volunteersByShift = [];
        for (var i = 0; i < this.associatedVolunteerArray.length; i++){
            var vol = this.associatedVolunteerArray[i];
            if (vol.shifts.includes(passedShift)) {
                volunteersByShift.push(vol);
            }
        }
        return volunteersByShift;
    }


    getVolunteerArrayByKeyListXX(passedKeyList){
        this.associatedVolunteerArray = []; // initialize first!
        for ( var i=0; i < passedKeyList.length; i++){
            this.tempVolunteer = this.getVolunteerbyKeyXX(passedKeyList[i]);
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

    getTeamKeyListXX(passedPollKey){
        this.teamKeyList = []; // zero out to mitigate duplicates
        if (this.volunteerListInMemory) {
            for (var i = 0; i < this.volunteerListInMemory.length; i++){
                if (this.volunteerListInMemory[i].associatedPollingStationKey == passedPollKey){
                    this.teamKeyList.push(this.volunteerListInMemory[i].volunteerKey)
                }
            }
        }
        return this.teamKeyList;
    }

    getTeamVolunteersByPollKey(passedPollKey){
        return this.getVolunteerArrayByKeyListXX(this.getTeamKeyListXX(passedPollKey));

    }

    getShiftCountFromStringXX(shiftString) { 
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
            associatedPollingStationKey: null, 
        }
        return this.currentVolunteer;
    }

generateStationStats( /* passedStationKey */){

    //get array all volunteers with same station key
    //setting the associatedVolunteerArray is now done from rest-service
    // calling setVolunteers()
    //this.associatedVolunteerArray = this.getTeamVolunteersByPollKey(passedStationKey);

    //return array length
    if (this.associatedVolunteerArray) {
        this.volunteerCount = this.associatedVolunteerArray.length;
        //count and aggregate each of their shift array lengths = filledShifts
        for (var i=0; i < this.associatedVolunteerArray.length; i++){
            this.shiftsFilled += this.getShiftCountFromStringXX(this.associatedVolunteerArray[i].shifts);
        }
        this.shiftsFilled = this.shiftsFilled/2;
        this.shiftsToFill = 45 - this.shiftsFilled;
    } else {
        this.volunteerCount = 0;
        this.shiftsFilled = 0;
        this.shiftsToFill = 0;
    }
}


    // Used in DC app only
    getNewVolunteerKey(){
        return this.currentVolunteer.volunteerKey;
    }

    getNewVolunteerPollingStationKey(){
        return this.currentVolunteer.associatedPollingStationKey;
    }

    // called by activity.ts
    getAssociatedVolunteers() {
        return this.associatedVolunteerArray;
    }
    getVolunteerCount(){
	return this.volunteerCount;
    }
    getVolunteersActive() {
	return this.activeVolunteers;
    }


// not in use

getShiftsToFill(){
return this.shiftsToFill;
}

getShiftsFilled(){
return this.shiftsFilled
}



}
