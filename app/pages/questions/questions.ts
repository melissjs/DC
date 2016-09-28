     import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UnregisteredsigninPage} from '../unregisteredsignin/unregisteredsignin';
import {RegisteredsigninPage} from '../registeredsignin/registeredsignin';



@Component({
  templateUrl: 'build/pages/questions/questions.html',
})
export class QuestionsPage {

  constructor(private navCtrl: NavController) {
      this.navCtrl = navCtrl;
     
  }

    onSubmit() {
        var that = this;
        try {
            that.navCtrl.push(UnregisteredsigninPage, {
            })

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

}