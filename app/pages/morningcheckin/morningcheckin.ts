import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {CheckLogin } from '../../components/check-login/check-login';

/*
  Generated class for the MorningcheckinPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/morningcheckin/morningcheckin.html',
  directives: [CheckLogin],
})
export class MorningcheckinPage {

    constructor(private navCtrl: NavController, private recordservice: Recordservice) {

    }

    onSubmit() {
	console.log("no op for now");
    }

}
