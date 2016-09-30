import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import {QuestionsPage} from '../questions/questions';
import {UserDataService} from '../../user-data-service.ts';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  userDataSvc: UserDataService;

  constructor(public navCtrl: NavController, navParams: NavParams,
  	      userDataSvc: UserDataService) {
      this.navCtrl = navCtrl;
      this.userDataSvc = userDataSvc; // navParams.get('userDataSvc');
      if (this.userDataSvc) {
          this.userDataSvc.setupFirebase();
      }
  }

    onSubmit() {
        var that = this;
        try {
            that.navCtrl.push(QuestionsPage, {
		userDataSvc: this.userDataSvc
            });

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

}
