import { Candidate } from '../candidate';
//import '../globals';
import { ElectOffice } from '../electoffice';
import { ElectOfficeGUI } from '../electofficegui';

export var PRIMCONGOFFICE: ElectOffice =
    {
	electOfficeKey: "Congress Primary 2016",
	office: "Congress",
	election: "Primary",
    }

export var PRIMCONGCANDS: Candidate[] =
    [
        { 
            value: 0, 
            label: "Tim Canova", 
            party: null,
        }, { 
            value: 1, 
            label: "Debbie Wasserman Schultz", 
            party: null,
        }, { 
            value: 25, 
            label: "I don't remember.", 
            party: null,
        }, { 
            value: 26, 
            label: "Other", 
            party: null,
        }, { 
            value: 27, 
            label: "I did not vote for this office.",
            party: null,
        }
    ];

export var PRIMARYCONGRESS: ElectOfficeGUI = 
    {
	inner: PRIMCONGOFFICE,
	candidates: PRIMCONGCANDS
    }

