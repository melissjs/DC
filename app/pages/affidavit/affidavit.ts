import { Component } from '@angular/core';
import { NavController, NavParams,  AlertController } from 'ionic-angular';

import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';


import {VotePage} from '../vote/vote';


@Component({
  templateUrl: 'build/pages/affidavit/affidavit.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AffidavitPage {
    fullName: string;
    addressNumName: string;
    zipCode: string;
    signature: string;


    affidavitAnswers: FormControl;
    affidavitQuestions: FormGroup;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, navParams: NavParams, fbld: FormBuilder) {
  this.navCtrl = navCtrl;
        this.affidavitAnswers = new FormControl("");
	  this.affidavitQuestions = fbld.group({
	  "affidavitAnswers": this.affidavitAnswers
      });
  this.fullName = null;
  this.addressNumName = null;
  this.zipCode = null;
  this.signature = null;
  }

      onSubmit() {
        var that = this;
        try {
                if (this.fullName == null){
                let alert = this.alertCtrl.create({
                    title: 'The top four fields are required.',
                    subTitle: 'Please fill out your name, partial address and signature, everything else on this page is optional.',
                    buttons: ['OK']
                });
                alert.present();
            } else {
                that.navCtrl.push(VotePage, {
                });
            }

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

}
