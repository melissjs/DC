import { Component } from '@angular/core';

/*
  Generated class for the OvrPcongressComponent component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'ovr-pcongress-component',
  templateUrl: 'build/components/ovr-pcongress-component/ovr-pcongress-component.html'
})
export class OvrPcongressComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }
}
