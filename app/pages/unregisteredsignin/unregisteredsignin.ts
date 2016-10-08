import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {RegisteredsigninPage} from '../registeredsignin/registeredsignin';


@Component({
  templateUrl: 'build/pages/unregisteredsignin/unregisteredsignin.html',
})
export class UnregisteredsigninPage {
enterSex: string;
enterParty: string;


  constructor(private navCtrl: NavController) {
  this.navCtrl = navCtrl;
  this.enterSex = null;
  this.enterParty = null;
  }

    onSubmit() {
        var that = this;
        try {
            
                that.navCtrl.push(RegisteredsigninPage, {
                });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

            onChangeSex(value){
        this.enterSex = value;
   }

           onChangeParty(value){
        this.enterParty = value;
   }

}
