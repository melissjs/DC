import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {VotePage} from '../vote/vote';


@Component({
  selector: 'level-of-support',
  templateUrl: 'build/pages/levelofsupport/levelofsupport.html',
  //inputs: ['LOSanswer']
})
export class LevelofsupportComponent {

    constructor(private navCtrl: NavController) {
      this.navCtrl = navCtrl;
    }

}
