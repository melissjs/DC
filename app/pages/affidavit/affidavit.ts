import { Component } from '@angular/core';
import { NavController, NavParams,  AlertController } from 'ionic-angular';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AffidavitRecord} from '../../affidavitrecord'
import {VotePage} from '../vote/vote';
import {NonvotePage} from '../nonvote/nonvote';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {Volunteerservice} from '../../providers/volunteerservice/volunteerservice';


@Component({
  templateUrl: 'build/pages/affidavit/affidavit.html'
})
export class AffidavitPage {
    affidavitForm: FormGroup;
    fullName: string;
    addressNumName: string;
    zipCode: string;
    signature: boolean;
    newAffidavitRecord: AffidavitRecord;
    recordservice: Recordservice;
    volunteerservice: Volunteerservice;
    //newAffidavitNumber: string;




  constructor(private navCtrl: NavController, private alertCtrl: AlertController, navParams: NavParams, public fb: FormBuilder, recordservice: Recordservice, volunteerservice: Volunteerservice) {
  this.navCtrl = navCtrl;
  this.fullName = null;
  this.addressNumName = null;
  this.zipCode = null;
  this.signature = false;
  this.recordservice = recordservice;
  this.volunteerservice = volunteerservice;
  this.newAffidavitRecord = this.recordservice.createVoidAffidavitRecord();
  //this.newAffidavitNumber = this.recordservice.generateNextAffidavitNumber();
  //console.log(this.newAffidavitNumber);
  var regExEmail: string = '[A-Za-z0-9._-][A-Za-z0-9._-]*@[A-Za-z0-9._-][A-Za-z0-9._-]*\.[a-zA-Z][a-zA-Z]*';
  var regExZip: string = '[0-9]{5}[-]?[0-9]?[0-9]?[0-9]?[0-9]?';
    
    this.affidavitForm = fb.group({  
    'fullName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    'addressNumName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    'zipCode': ['', Validators.compose([Validators.required, Validators.pattern(regExZip)])],
    'affirm': [false, Validators.required],
    'comments': [''],
    'emailAddress': ['', Validators.compose([Validators.pattern(regExEmail)])],
    'photoReceipt': [''],
    });




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
    var newval = !value;
    console.log('signature selected:' + newval);
    this.signature = newval;
            if (this.signature == true){
         let alert = this.alertCtrl.create({
                    //title: 'Please confirm',
                    subTitle: 'I have read this statement and confirm that I understand the terms for participating in this audit.',
                    buttons: ['CONFIRM'] 
                });
                alert.present();}

  }

      onSubmit(value: any): void { 
          var that = this;

          // Make sure checkbox is used
          if (this.signature!=true){
         let alert = this.alertCtrl.create({
                    title: 'Checkbox Required',
                    subTitle: 'Please use the checkbox to confirm that you have read the affirmation.',
                    buttons: ['CONFIRM'] 
                });
                alert.present();
                return;
                } else {

           //fill in object
           this.newAffidavitRecord = {
                //affidavitNumber: this.newAffidavitNumber,
                volunteerKey: this.volunteerservice.getNewVolunteerKey(),
                fullName: value.fullName,
                streetAddress: value.addressNumName,
                zip: value.zipCode,
                comments: value.comments,
                emailAddress: value.emailAddress,
                evidence: value.photoReceipt,
           }
           console.log(this.newAffidavitRecord);

           
           if (!this.recordservice.getNonVoteBool()){
                try {that.navCtrl.setRoot(VotePage, {})}
                catch (EE) {console.log('error in Submitting, exc='+ EE.toString())}
           } else if (this.recordservice.getNonVoteBool()){
               try {that.navCtrl.setRoot(NonvotePage, {})}
                catch (EE) {console.log('error in Submitting, exc='+ EE.toString())}
         }





       /* var that = this;
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
        }*/
      }
    }

}
