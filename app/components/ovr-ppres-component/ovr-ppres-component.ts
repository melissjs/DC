import { Component } from '@angular/core';

/*
  Generated class for the OvrPpresComponent component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'ovr-ppres-component',
  templateUrl: 'build/components/ovr-ppres-component/ovr-ppres-component.html'
})
export class OvrPpresComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }
}
