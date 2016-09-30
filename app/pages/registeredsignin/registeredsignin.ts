import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserDataService} from '../../user-data-service.ts';
import {AddnewrecordPage} from '../addnewrecord/addnewrecord.ts';
import {Toast} from 'ionic-native';


/*
  Generated class for the RegisteredsigninPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/registeredsignin/registeredsignin.html',
})
export class RegisteredsigninPage {

    role: string;
    email: string;
    password: string;
    vol_email: string;
    userDataSvc:UserDataService;
    dbError: any;

    constructor(private navCtrl: NavController, navParams: NavParams) {
	this.navCtrl = navCtrl;
	this.role = navParams.get('role');
	this.userDataSvc = navParams.get('userDataSvc');
	this.email = null;
	this.password = null;
	this.vol_email = null;
	switch (this.role) {
	case 'registeredTeamLead': 
	    break;
	case 'registeredVolunteer':
	    break;
	case 'checkingBackIn': 
	    break;
	}
    }


    onChangeEmail(value) {
        console.log('email setting to:' + value);
        this.email = value;
	this.userDataSvc.setEmail(value);
    }
    onChangePwd(value) {
        console.log('pwd setting to:' + value);
        this.password = value;
    }
    onChangeVolEmail(value) {
        console.log('vol_email setting to:' + value);
        this.vol_email = value;
    }

    onSubmit() {
        var that = this;
	var credentials : any = {password: this.password};
        try {
            // login using the email/password auth provider
            that.userDataSvc.login(credentials).subscribe(
                (data: any) => {
                    console.log('data for login = '+ data.toString());
                    that.navCtrl.setRoot(AddnewrecordPage, {
                        userDataSvc: that.userDataSvc
                    });
                },
                (error) => {
                    console.log('error onSubmit ' + error.toString());
                    let msg = "Error Logging In: " + error.toString();
                    Toast.show(msg, "3000", "center");
                    if ((!that.dbError) ||
                        (that.dbError !== that.userDataSvc.getNotAuthenticatedMsg())) {
                        that.dbError = error.toString();
                    } else {
                        /* If we already got this error once, then we just allow
                           to go into a test mode... */
                        that.dbError = null;
                        that.userDataSvc.setTestMode(true);
                        that.navCtrl.setRoot(AddnewrecordPage, {
                            userDataSvc: that.userDataSvc
                        });
                    }
                }
            );
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }


}
