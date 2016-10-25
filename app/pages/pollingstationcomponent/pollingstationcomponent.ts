import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Volunteer} from '../../volunteer';
// pipes
//import { Searchpipe } from '../../pipes/searchpipe.ts';

@Component({
  selector: 'pollingstationcomponent',
  templateUrl: 'build/pages/pollingstationcomponent/pollingstationcomponent.html',
  inputs: ['passedStations', 'Volunteer']
  //pipes: [Searchpipe],
})
export class PollingstationComponent {


}
