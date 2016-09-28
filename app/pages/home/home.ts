import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import {QuestionsPage} from '../questions/questions';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
      this.navCtrl = navCtrl;
  }

    onSubmit() {
        var that = this;
        try {
            that.navCtrl.push(QuestionsPage, {
            });

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

}
