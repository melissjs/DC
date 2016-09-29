import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import { Component } from '@angular/core';
import {NavController } from 'ionic-angular';

import {UnregisteredsigninPage} from '../unregisteredsignin/unregisteredsignin';
import {RegisteredsigninPage} from '../registeredsignin/registeredsignin';

@Component({
    templateUrl: 'build/pages/questions/questions.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class QuestionsPage {

    registeredTeamLead: string = "registeredTeamLead";
    registeredVolunteer: string = "registeredVolunteer";
    newVolunteer: string = "newVolunteer";
    checkingBackIn: string = "checkingBackIn";
    teamLeadOrVolunteer: string;
    selectedItem: any;

    answers: FormControl;
    question: FormGroup;


    constructor(private navCtrl: NavController, fbld: FormBuilder) {
      this.navCtrl = navCtrl;
      this.answers = new FormControl("");
	this.question = fbld.group({
	  "answers": this.answers
      });
      this.teamLeadOrVolunteer = null;
  }

    onAnsChange(inval: string) {
	this.teamLeadOrVolunteer = inval;
    }

    onSubmit() {
        try {
	    switch (this.teamLeadOrVolunteer) {
		case this.registeredTeamLead: 
		case this.registeredVolunteer:
		case this.checkingBackIn: 
		  this.navCtrl.push(RegisteredsigninPage, {
		  });
		  break;
		case this.newVolunteer:
		  this.navCtrl.push(UnregisteredsigninPage, {		  
		  });
		  break;
	    default: 
		alert('You must choose an option first!');
	    }
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }
}
