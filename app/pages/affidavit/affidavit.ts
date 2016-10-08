import { Component } from '@angular/core';
import { NavController, NavParams,  AlertController } from 'ionic-angular';


import {VotePage} from '../vote/vote';


@Component({
  templateUrl: 'build/pages/affidavit/affidavit.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class AffidavitPage {
    fullName: string;
    addressNumName: string;
    zipCode: string;
    signature: boolean;




  constructor(private navCtrl: NavController, private alertCtrl: AlertController, navParams: NavParams) {
  this.navCtrl = navCtrl;
  this.fullName = null;
  this.addressNumName = null;
  this.zipCode = null;
  this.signature = false;
  }

  onChangeFullName(value) {
    console.log('full name selected:' + value);
    this.fullName = value;
  }

  onChangeAddress(value) {
    console.log('address name selected:' + value);
    this.addressNumName = value;
  }

  onChangeZipCode(value) {
    console.log('zip code selected:' + value);
    this.zipCode = value;
  }

  onChangeSignature(value) {
    console.log('signature selected:' + value);
    this.signature = value;

        if (this.signature == true){
         let alert = this.alertCtrl.create({
                    title: 'I aknowledge this to be true.',
                    subTitle: 'Please fill out your name, partial address and signature, everything else on this page is optional.',
                    buttons: ['OK']
                });
                alert.present();}

  }

      onSubmit() {
        var that = this;
        try {
                if ((this.fullName == null) ||
		    (this.addressNumName == null) ||
		    (this.zipCode == null) ||
		    (this.signature == false))
		{
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
