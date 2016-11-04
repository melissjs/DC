import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Ovrservice {
  gePres:string;
  gePresLos: string;

  constructor(private http: Http) {}

}

