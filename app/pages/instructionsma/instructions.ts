import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InstructComponent } from '../../components/instruct-component/instruct-component';

/*
  Generated class for the InstructionsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/instructionsma/instructions.html',
  directives: [InstructComponent],
})
export class InstructionsPage {

  constructor(private navCtrl: NavController) {

  }

}
