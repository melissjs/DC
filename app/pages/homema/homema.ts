import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
// import {QuestionsPage} from '../questions/questions';
// import {UserDataService} from '../../user-data-service';
import { Volunteer} from '../../volunteer';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Volunteerservice } from '../../providers/volunteerservice/volunteerservice';
import {RestService} from '../../providers/rest-service/rest-service';
//import { AccountsettingsPage } from '../accountsettings/accountsettings';
//import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { LoginPageMa } from '../loginpagema/loginpagema';

@Component({
  templateUrl: 'build/pages/homema/homema.html',
    // directives: [Logincomponent]
})
export class HomePageMa {


//  userDataSvc: UserDataService;
  restSvc: RestService;

  constructor(public navCtrl: NavController, navParams: NavParams,
  	      /* userDataSvc: UserDataService, */ restSvc: RestService) {

      this.navCtrl = navCtrl;
      this.restSvc = restSvc;
      //  this.loggedIn = this.restSvc.getLoggedIn();
      // console.log(this.loggedIn);
      /* 
      this.userDataSvc = userDataSvc; // navParams.get('userDataSvc');
      if (this.userDataSvc) {
          this.userDataSvc.setupFirebase();
      } */
  }

    onLoginClick(){
	var that = this;
	try {
            console.log('about to setroot login component...');
            that.navCtrl.push(LoginPageMa);
	} catch (EE) { 
            console.log('error in Submitting, exc='+ EE.toString())
	}
    }  

    onLogout() {
	this.restSvc.onLogout(this,this.displayError);
    }

    displayError(that:any,text: string,subtitle: string) {
        that.errorMessage = text + ':' + subtitle;
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
