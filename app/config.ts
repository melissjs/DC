// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
//export var accountSid = process.env.TWILIO_ACCOUNT_SID;
//export var authToken = process.env.TWILIO_AUTH_TOKEN;

// A Twilio number you control - choose one from:
// https://www.twilio.com/user/account/phone-numbers/incoming
// Specify in E.164 format, e.g. "+16519998877"
//export var twilioNumber = process.env.TWILIO_NUMBER;

//For Testing locally, uncomment the following.
//export var MT_HOST  = 'http://localhost:8088';
export var MT_HOST  = '';
export var AUTHY_VER_URL = MT_HOST + '/api/verificationinit/';
export var AUTHY_CHK_URL = MT_HOST + '/api/verificationcheck/';
