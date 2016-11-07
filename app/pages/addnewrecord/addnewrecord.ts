import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {VoterecordPage} from '../voterecord/voterecord';
import {AmendmentrecordPage} from '../amendmentrecord/amendmentrecord';
import {AnomalyrecordPage} from '../anomalyrecord/anomalyrecord';
import {AuthenticationPage} from '../../pages/authentication/authentication';
import {Recordservice} from '../../providers/recordservice/recordservice';

@Component({
  templateUrl: 'build/pages/addnewrecord/addnewrecord.html',
})
export class AddnewrecordPage {
recordservice: Recordservice;

  constructor(private navCtrl: NavController, recordservice: Recordservice) {
  this.navCtrl = navCtrl;
  this.recordservice = recordservice;
  
  }

      onSubmitVoterRecord() {
                var that = this;
	            this.recordservice.setToNonVote(false);

                    try {
                        that.navCtrl.push(VoterecordPage, {
                        })

                    } catch (EE) {
                        console.log('error in Submitting, exc='+ EE.toString())
                    }

        }



        onSubmitNonVoterRecord() {
                    var that = this;
                    this.recordservice.setToNonVote(true);
                    console.log('hello' + this.recordservice.getNonVoteBool());
	   
                    try {
                        that.navCtrl.push(VoterecordPage, {
                        })

                    } catch (EE) {
                        console.log('error in Submitting, exc='+ EE.toString())
                    }

        }
         
        onSubmitAnomalyRecord() {
                    var that = this;
                    try {
                        that.navCtrl.push(AnomalyrecordPage, {
                        })

                    } catch (EE) {
                        console.log('error in Submitting, exc='+ EE.toString())
                    } 
        } 
        
        onSubmitAmendmentRecord() { 
                    var that = this;
                    try {
                        that.navCtrl.push(AmendmentrecordPage, {
                        })

                    } catch (EE) {
                        console.log('error in Submitting, exc='+ EE.toString())
                    } 
      }

      onSubmitAuthenticate() {
                    var that = this;
                    try {
                        that.navCtrl.push(AuthenticationPage, {
                        })
                    } catch (EE) {
                        console.log('error in Submitting, exc='+ EE.toString())
                    } 
      }

} // class end 
