import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {VoterecordPage} from '../voterecord/voterecord';
import {AmendmentrecordPage} from '../amendmentrecord/amendmentrecord';
import {AnomalyrecordPage} from '../anomalyrecord/anomalyrecord';


@Component({
  templateUrl: 'build/pages/addnewrecord/addnewrecord.html',
})
export class AddnewrecordPage {

  constructor(private navCtrl: NavController) {
  this.navCtrl = navCtrl;
  
  }

      onSubmit(value) {
        var that = this;
        var recordType = value;

        //console.log('recordType='+ recordType); 
        if (recordType == 'voterRecord'){
	   
                    try {
                        that.navCtrl.push(VoterecordPage, {
                        })

                    } catch (EE) {
                        console.log('error in Submitting, exc='+ EE.toString())
                    }

        } 
        
        if (recordType == 'anomalyRecord'){ 
                    try {
                        that.navCtrl.push(AnomalyrecordPage, {
                        })

                    } catch (EE) {
                        console.log('error in Submitting, exc='+ EE.toString())
                    } 
        } 
        
        if (recordType == 'amendmentRecord'){ 
                    try {
                        that.navCtrl.push(AmendmentrecordPage, {
                        })

                    } catch (EE) {
                        console.log('error in Submitting, exc='+ EE.toString())
                    } 
      }





      } // onSub end


} // class end 