import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Ovrservice {
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

// gePres

setgePres(passedString){
this.gePres = passedString;
}


getgePres(passedString){
return this.gePres;
}

setgePresWriteIn(passedString){
this.gePresWriteIn = passedString;
}


getgePresWriteIn(passedString){
return this.gePresWriteIn;
}

setgePresLos(passedString){
this.gePresLos = passedString;
}


getgePresLos(passedString){
return this.gePresLos;
}

// pPres

setpPres(passedString){
this.pPres = passedString;
}


getpPres(passedString){
return this.pPres;
}

setpPresWriteIn(passedString){
this.pPresWriteIn = passedString;
}


getpPresWriteIn(passedString){
return this.pPresWriteIn;
}

setpPresLos(passedString){
this.pPresLos = passedString;
}


getpPresLos(passedString){
return this.pPresLos;
}


// pCong

setpCong(passedString){
this.pCong = passedString;
}


getpCong(passedString){
return this.pCong;
}

setpCongWriteIn(passedString){
this.pCongWriteIn = passedString;
}


getpCongWriteIn(passedString){
return this.pCongWriteIn;
}

setpCongsLos(passedString){
this.pCongLos = passedString;
}


getpCongLos(passedString){
return this.pCongLos;
}

}

