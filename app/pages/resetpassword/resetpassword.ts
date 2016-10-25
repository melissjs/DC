import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Changepasswordcomponent } from '../changepasswordcomponent/changepasswordcomponent';
import { Volunteer} from '../../volunteer';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import { AccountsettingsPage } from '../accountsettings/accountsettings';
import {RestService} from '../../providers/rest-service/rest-service';



@Component({
  templateUrl: 'build/pages/resetpassword/resetpassword.html',
})
export class ResetpasswordPage {
resetForm: FormGroup;
resetWithCodeForm: FormGroup;
regExPassword: string;
regExEmail: string;
volunteerservice: Volunteerservice;
volunteerHere: Volunteer;
errorText: string;
volunteerList: Volunteer[];
loggedIn: boolean;
emailWasSent: boolean;
errorTextEmail: string;

  constructor(private navCtrl: NavController, public fb: FormBuilder, volunteerservice: Volunteerservice, private restSvc: RestService) {
  this.navCtrl = navCtrl;
  this.volunteerservice = volunteerservice;
  this.restSvc = restSvc;
  this.loggedIn = false;
  this.emailWasSent = false;
  this.volunteerHere = this.volunteerservice.getNewVolunteer();
  this.volunteerList = this.volunteerservice.getVolunteers();
  this.regExEmail = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*';

  this.resetForm = fb.group({  
            'enterEmailAddress': ['', Validators.compose([Validators.required, Validators.pattern(this.regExEmail)])],
            //'enterOneTimePasscode': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });


          this.resetWithCodeForm = fb.group({  
            'enterOneTimePasscode': ['', Validators.compose([Validators.required])],
            'enterCreatePasscode': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            'enterConfirmPasscode': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
  }
  






  onSubmitEmailOnly(value: any): void {
    if (this.volunteerservice.getVolunteerByEmail(value.enterEmailAddress.toLowerCase())){
  this.volunteerHere = this.volunteerservice.getVolunteerByEmail(value.enterEmailAddress);
  this.emailWasSent = true;
  console.log(this.volunteerHere);
  //this.restSvc.setLoggedIn
    } else {
      this.errorTextEmail = 'This email is not recognized in our system.';
    }
  }

onSubmitCodes(value: any): void {
  if (this.volunteerHere.passcode == value.enterOneTimePasscode){
            if(value.enterCreatePasscode == value.enterConfirmPasscode){
            this.volunteerHere.passcode = value.enterCreatePasscode;
            console.log(this.volunteerHere.passcode);
            this.volunteerservice.setNewVolunteer(this.volunteerHere);
            //then
                // Eric Note.. should not be setting logged in flag.
                // this.restSvc.setLoggedIn(true);
                  var that = this;
              try {
                  
                  this.navCtrl.push(AccountsettingsPage, {
                  });
                  
              } catch (EE) {
                  console.log('error in Submitting, exc='+ EE.toString())
                  
              }
          } else if (value.enterCreatePasscode !== value.enterConfirmPasscode){
            this.errorText = 'Passwords do not match.'
          } 
  }
  else {this.errorText = 'The one time passcode you entered was not correct.'}
}







}
