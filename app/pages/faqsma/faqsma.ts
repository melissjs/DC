import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FaqComponent } from '../../components/faq-component/faq-component';

/*
  Generated class for the FaqsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/faqsma/faqsma.html',
  directives: [FaqComponent],
})
export class FaqsMaPage {

  constructor(private navCtrl: NavController) {

  }

}
