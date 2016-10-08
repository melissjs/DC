
import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {provideForms, disableDeprecatedForms} from '@angular/forms';
import {StatusBar} from 'ionic-native';

  // actual pages called from menu
// import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
// import {ListPage} from './pages/list/list';
import {InstructionsPage} from './pages/instructions/instructions';
import {FaqsPage} from './pages/faqs/faqs';
import {AddnewrecordPage} from './pages/addnewrecord/addnewrecord';
import {CheckinPage} from './pages/checkin/checkin';
import {CheckoutPage} from './pages/checkout/checkout';
//import {QrcodePage} from './pages/qrcode/qrcode';
import {ActivityrecordPage} from './pages/activityrecord/activityrecord';
import {MorningcheckinPage} from './pages/morningcheckin/morningcheckin';
import {EveningcheckoutPage} from './pages/eveningcheckout/eveningcheckout';
import {VolunteerlistPage} from './pages/volunteerlist/volunteerlist';
import {AccountsettingsPage} from './pages/accountsettings/accountsettings';
//import {AmendmentverificationPage} from './pages/amendmentverification/amendmentverification';

  // intermediate pages called from others
import {VoterecordPage} from './pages/voterecord/voterecord';
import {AffidavitPage} from './pages/affidavit/affidavit';
import {RegisteredsigninPage} from './pages/registeredsignin/registeredsignin';
import {UnregisteredsigninPage} from './pages/unregisteredsignin/unregisteredsignin';
import {AmendmentrecordPage} from './pages/amendmentrecord/amendmentrecord';
import {AnomalyrecordPage} from './pages/anomalyrecord/anomalyrecord';
import {DemographicsPage} from './pages/demographics/demographics';
import {VotePage} from './pages/vote/vote';
import {QuestionsPage} from './pages/questions/questions';
import {HomePage} from './pages/home/home';
import {EndPage} from './pages/end/end';

  // intermediate components called from others
//import {LevelofsupportComponent} from './pages/levelofsupport/levelofsupport';

import {UserDataService} from './user-data-service';


@Component({
  templateUrl: 'build/app.html',
  // config: {}, // http://ionicframework.com/docs/v2/api/config/Config/	  
  providers: [UserDataService]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  userDataSvc: UserDataService;

  constructor(
    public platform: Platform,
      public menu: MenuController,
      userDataSvc: UserDataService
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
    //   { title: 'Hello Ionic', component: HelloIonicPage },
    //   { title: 'List', component: ListPage },
       { title: 'Instructions', component: InstructionsPage },
       { title: 'FAQs', component: FaqsPage },
       { title: 'Add New Record', component: AddnewrecordPage },
       { title: 'Check In', component: CheckinPage },
       { title: 'Check Out', component: CheckoutPage },
       //{ title: 'QR Code', component: QrcodePage },
       { title: 'Activity Record', component: ActivityrecordPage },
       { title: 'Morning Check In', component: MorningcheckinPage },
       { title: 'Evening Check Out', component: EveningcheckoutPage },
       { title: 'Volunteer List', component: VolunteerlistPage },
       { title: 'Account Settings', component: AccountsettingsPage },
       //{ title: 'Amendment Verification', component: AmendmentverificationPage },
       
       
       
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp, [provideForms(), disableDeprecatedForms()]);
