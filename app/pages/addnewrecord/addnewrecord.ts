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

      onSubmit(value) {
        var recordType = value;
	//        console.log("string works, but variable appears to be undefined still"); 
        console.log('recordType='+recordType); 
        if(recordType == 'voterRecord'){
	        console.log("this should type out the string of chosen record, my if statement is wrong?"); 
        }
      }
}