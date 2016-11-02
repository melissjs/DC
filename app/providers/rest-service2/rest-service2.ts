import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Recordservice} from '../recordservice/recordservice';

import * as config from '../../config';

let authyURL = config.AUTHY_VER_URL;

/*
  Generated class for the RestService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestService2 {

    recSvc: Recordservice;

    constructor(private http: Http, recSvc: Recordservice) {
        // generate values
	this.recSvc = recSvc;
    }

    saveAmendmentList(amSuccessCb, amFailureCb, thatObj) {
	// call middle tier to save the amendment list.
	amSuccessCb(thatObj, false, null);
    }
    
    saveTimesheetList(amSuccessCb, amFailureCb, thatObj) {
	// call middle tier to save the time sheet list.
	amSuccessCb(thatObj, false, null);
    }

}
