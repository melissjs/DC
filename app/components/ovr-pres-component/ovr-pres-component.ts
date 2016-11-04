import { Component } from '@angular/core';

/*
  Generated class for the OvrPresComponent component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'ovr-pres-component',
  templateUrl: 'build/components/ovr-pres-component/ovr-pres-component.html'
})
export class OvrPresComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }
}
