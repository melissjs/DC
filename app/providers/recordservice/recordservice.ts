import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// interfaces
import { Volunteer} from '../../volunteer';
import { PollingStation } from '../../pollingstation';

import { AnomalyRecord } from '../../anomalyrecord';
import { AmendmentRecord } from '../../amendmentrecord';
import { AffidavitRecord } from '../../affidavitrecord';
import { DemographicsRecord } from '../../demographicsrecord';
import { VoteRecord } from '../../voterecord';

import { ANOMALYLIST } from '../../anomalylist';
import { AMENDMENTLIST } from '../../amendmentlist';
import { AFFIDAVITLIST } from '../../affidavitlist';
import { DEMOGRAPHICSLIST } from '../../demographicslist';
import { VOTELIST } from '../../votelist';


/*
  Generated class for the Recordservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Recordservice {
  anomalyRecordList: AnomalyRecord[];
  amendmentRecordList: AmendmentRecord[];
  affidavitRecordList: AffidavitRecord[];
  demographicsRecordList: DemographicsRecord[];
  voteRecordList: VoteRecord[];
  

  constructor(private http: Http) {
  this.anomalyRecordList = ANOMALYLIST;
  this.amendmentRecordList = AMENDMENTLIST;
  this.affidavitRecordList = AFFIDAVITLIST;
  this.demographicsRecordList = DEMOGRAPHICSLIST;
  this.voteRecordList = VOTELIST;

  }



getAnomalyList(){
  return this.anomalyRecordList;
};

getAmendmentList(){
  return this.amendmentRecordList;
};

getAffidavitList(){
  return this.affidavitRecordList;
};

getDemographicsList(){
  return this.demographicsRecordList;
};

getVoteList(){
  return this.voteRecordList;
};

}

