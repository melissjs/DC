import { AnomalyRecord } from '../anomalyrecord'


export var ANOMALYLIST: AnomalyRecord[] = [
    {
volunteerKey: "v3",
nature: "Handed provisional ballot incorrectly.",
fullName: "Mary Joe",
emailAddress: "mj@blue.net",
comments: "I know this was my polling station.",
evidence: true,
},     {
volunteerKey: "v2",
nature: "Registration was changed without knowledge.",
fullName: null,
emailAddress: null,
comments: "I'm very upset.",
evidence: true,
},       {
volunteerKey: "v3",
nature: "Voting machine selected wrong candidate.",
fullName: null,
emailAddress: null,
comments: null,
evidence: false,
},       {
volunteerKey: "v1",
nature: "Voting machine selected wrong candidate.",
fullName: null,
emailAddress: null,
comments: null,
evidence: false,
}
] 

