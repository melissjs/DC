import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import {QuestionsPage} from '../questions/questions';
import {UserDataService} from '../../user-data-service';
import { Volunteer} from '../../volunteer';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import {RestService} from '../../providers/rest-service/rest-service';
import { AccountsettingsPage } from '../accountsettings/accountsettings';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { Logincomponent } from '../logincomponent/logincomponent';




@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [Logincomponent]
})
export class HomePage {


  userDataSvc: UserDataService;
  loggedIn: boolean;
  restservice: RestService;

  constructor(public navCtrl: NavController, navParams: NavParams,
  	      userDataSvc: UserDataService, restservice: RestService) {

      this.navCtrl = navCtrl;
      this.restservice = restservice;
    //  this.loggedIn = this.restservice.getLoggedIn();
     // console.log(this.loggedIn);
      this.userDataSvc = userDataSvc; // navParams.get('userDataSvc');
      if (this.userDataSvc) {
          this.userDataSvc.setupFirebase();
      }
  }
/*
    onSubmit() {
        var that = this;
        try {
            that.navCtrl.push(QuestionsPage, {
		userDataSvc: this.userDataSvc
            });

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }*/
    

    
}
