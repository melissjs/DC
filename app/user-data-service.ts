import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import * as firebase from 'firebase';

@Injectable()
export class UserDataService {
    // public db: any;
    http:  Http;
    email:string;
    authemail: string;
    password:string;
    // pin: string;
    baseRef: any;//Firebase;
    public auth : any;
    // firebase: any;
    notAuthenticatedError : string="Not yet authenticated with Database.";
    testMode :boolean;

    constructor(http: Http) {

        this.http = http;
        this.email = null;
        this.authemail = null;
        this.password = null;
        // this.pin = null;
        // this.firebase = null;
        this.setupFirebase();
        this.testMode = false;
        this.auth = null;
        
        if (this.baseRef) {
            /* 
            this.baseRef.onAuth((authData) => {
                if (authData) {
                    console.log("User " + authData.uid + " is logged in with " + authData.provider);
                } else {
                    console.log("User is logged out");
                }
            });
            */
            this.auth = firebase.auth();
            if (this.auth) {
                    console.log("User " + this.auth.uid + " is logged in with " + this.auth.provider);
            } else {
                console.log("User is logged out");
            }
        }
        console.log('end of dataserv');
    }
    
    logout() {
        if (this.baseRef) {
            this.baseRef.unauth()
        }
        /* 
        if (!this.firebase) {
            alert('logout before login');
            return;
        }
        */
        /* 
        this.firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }, function(error) {
            // An error happened.
        });
        */
    }

    public isAuthenticated() {
        if (this.baseRef) {
            this.auth = firebase.auth();            
            return (this.auth !== null)
        } else {
            return false;
        }
    }

    public setTestMode(value) {
        this.testMode = value;
    }

    public isTestMode() {
        return this.testMode;
    }

    public getNotAuthenticatedMsg() {
        return this.notAuthenticatedError;
    }

    public setupFirebase() {
        //this.firebase = firebase;
        //this.baseRef = firebase.database().ref();
        // See https://firebase.google.com/docs/web/setup#project_setup for how to
        // auto-generate this config
        try {
            var config = {
                apiKey: "AIzaSyBqoNNyRLKaWfc9gqsAAEX-IGje08vu67w",
                authDomain: "election2016test.firebaseapp.com",
                databaseURL: "https://election2016test.firebaseio.com",
                storageBucket: "election2016test.appspot.com",
                messagingSenderId: "75037427121"
            };

        } catch (exc) {
            console.log('error creating firebase..' + exc.toString());
            this.baseRef = null;
        }

        try {
            if (this.baseRef == null) {
                firebase.initializeApp(config);
                this.baseRef = firebase.database().ref();
            }
        } catch (exc) {
            console.log('error initializing App for firebase..' + exc.toString());
            this.baseRef = null;
        }

        // https://dcprimaryaudit.firebaseio.com
        // https://caprimaryaudit.firebaseio.com
        // https://ca-primary-test.firebaseio.com
        // https://dc-primary-test.firebaseio.com
        // this.firebase = this.baseRef;
    }

    public getEmail() {
        return this.email;
    }

    setEmail(value) {
        if ((value != null) && (value.match('.*[@].*') != null)) {
            this.email = value;
            return true;
        } else {
            alert('not a valid email@address:'+value);
            return false;
        }
    }
    
    setPassword(value) {
        this.password = value;
    }

    /* setPin(value) {
        this.pin = value;
    } */
    
    public login(_credentials) {
        var that = this
        var thisemail = this.email;
        console.log('logging in with:'+thisemail+','+
                    _credentials.password /* + ',pin=' + _credentials.pin */);

        if (!thisemail) {
            return Observable.create(observer => {
                observer.error("No email address specified!.");
                observer.complete();
            });
        }

        // If they have already logged in once before...
        if ((that.isAuthenticated()) || (that.isTestMode())) {
            if (thisemail) {
                if (that.authemail == thisemail) {
                    // same user.. check the password...
                    /* 
                    if (that.pin) {
                        if (that.pin === _credentials.pin) {
                            // everything ok... no need to reauthenticate..
                            console.log('authenticated using pin');
                            var authVal = null;
                            if (that.baseRef) {
                                authVal = that.auth;
                            } else {
                                authVal = "test mode";
                            }
                            return Observable.create(observer => {
                                observer.next(authVal);
                                observer.complete();
                            });
                        } else {
                            // bad pin...
                            console.log('prev pin mismatch!');
                            return Observable.create(observer => {
                                observer.error("Invalid PIN Entered");
                                observer.complete();
                            });
                        }
                    } else {
                        // no PIN stored.. must have been reset.. use next code...
                    }
                    */
                } else {
                    // different email entered.. use next code
                }
            } else {
                // no email stored.. reset?  use next code...
            }
        }
        var password = _credentials.password;
        /*
        that.pin = _credentials.pin;
        */
        if (that.baseRef) {
            return new Observable(observer => {
                return that.auth.signInWithEmailAndPassword
                (thisemail,_credentials.password)
                .then(function(authData) {
                    console.log("Authenticated successfully");
                    that.authemail = thisemail;
                    observer.next(authData)
                }).catch(function(error) {
                    // Handle Errors here.
                    // [START_EXCLUDE]
                    console.log("Login Failed!", error);
                    observer.error(error);
                })
            });
        } else {
            // first time?
            // store the information for next time...
            that.authemail = thisemail;
            if (that.isTestMode()) {
                return Observable.create(observer => {
                    observer.next(thisemail + ' in test mode');
                    observer.complete();
                });
            } else {
                return Observable.create(observer => {
                    observer.error(this.notAuthenticatedError);
                    observer.complete();
                });
            }
        }
    }
    
    /*

    public login() {
        var that = this
        var retval = false;

        // alert('in login with:'+that.email+','+that.password);
        var obs = new Observable(observer => {
            that.baseRef.authWithPassword({
                "email": that.email,
                "password": that.password
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    observer.error(error)
                } else {
                    console.log("Authenticated successfully with payload-", authData);
                    retval = true;
                    observer.next(authData)
                }
            });
        });
        retval = true;
        */
        /*
        this.firebase.auth().signInWithEmailAndPassword(that.email, that.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Error logging in code,message='+error.code+','+error.message);
            retval = false;
        });     
        */
/*
        // this.db = baseRef.database().ref('/');
        return retval;
    }
*/
    getBaseRef() {
        return this.baseRef;
    }

}
