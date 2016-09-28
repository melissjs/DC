import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import {AffidavitPage} from '../affidavit/affidavit';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, navParams: NavParams, 
              private menu: MenuController) {
      this.navCtrl = navCtrl;
      this.menu = menu;
  }

    onSubmit() {
        var that = this;
        try {
            that.navCtrl.setRoot(AffidavitPage, {
            });

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

}
