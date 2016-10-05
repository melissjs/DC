import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {VoterecordPage} from '../voterecord/voterecord';



@Component({
  templateUrl: 'build/pages/addnewrecord/addnewrecord.html',
})
export class AddnewrecordPage {


  constructor(private navCtrl: NavController) {
  this.navCtrl = navCtrl;
  }

           onSubmit() {
        var that = this;
        try {
            that.navCtrl.push(VoterecordPage, {
            })

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
           }
}


