import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { OfficeVoteRecord } from '../../officevoterecord';


@Injectable()
export class Ovrservice {
  officevoterecord: OfficeVoteRecord;

  gePres:string;
  gePresWriteIn:string;
  gePresLos:string;

  pPres:string;
  pPresWriteIn:string;
  pPresLos:string;

  pCong:string;
  pCongWriteIn:string;
  pCongLos:string;

  constructor(private http: Http) {
  this.gePres=null;
  this.gePresWriteIn=null;
  this.gePresLos=null;

  this.pPres=null;
  this.pPresWriteIn=null;
  this.pPresLos=null;

  this.pCong=null;
  this.pCongWriteIn=null;
  this.pCongLos=null;

  }

  // clear all records
  clearAll(){
  this.gePres=null;
  this.gePresWriteIn=null;
  this.gePresLos=null;

  this.pPres=null;
  this.pPresWriteIn=null;
  this.pPresLos=null;

  this.pCong=null;
  this.pCongWriteIn=null;
  this.pCongLos=null;
  }

  // get void
  getVoidOfficeVoteRecord(){
  this.officevoterecord = {
  voteRecordKey: null,
  office: null,
  election: null,
  success: false,
  candidate: null,
  levelOfSupport: null,
  }
  return this.officevoterecord;
  }

// gePres

setgePres(passedString){
this.gePres = passedString;
}


getgePres(){
return this.gePres;
}

setgePresWriteIn(passedString){
this.gePresWriteIn = passedString;
}


getgePresWriteIn(){
return this.gePresWriteIn;
}

setgePresLos(passedString){
this.gePresLos = passedString;
}


getgePresLos(){
return this.gePresLos;
}

// pPres

setpPres(passedString){
this.pPres = passedString;
}


getpPres(){
return this.pPres;
}

setpPresWriteIn(passedString){
this.pPresWriteIn = passedString;
}


getpPresWriteIn(){
return this.pPresWriteIn;
}

setpPresLos(passedString){
this.pPresLos = passedString;
}


getpPresLos(){
return this.pPresLos;
}


// pCong

setpCong(passedString){
this.pCong = passedString;
}


getpCong(){
return this.pCong;
}

setpCongWriteIn(passedString){
this.pCongWriteIn = passedString;
}


getpCongWriteIn(){
return this.pCongWriteIn;
}

setpCongsLos(passedString){
this.pCongLos = passedString;
}


getpCongLos(){
return this.pCongLos;
}



}

