import { Candidate } from '../candidate';
//import '../globals';
import { ElectOffice } from '../electoffice';
import { ElectOfficeGUI } from '../electofficegui';

export var PRIMPRESOFFICE: ElectOffice =
    {
	electOfficeKey: "2016 Primary President",
	office: "President",
	election: "Primary",
	mandatory: false,
    }

export var PRIMPRESCANDS: Candidate[] = 
    [
        { 
            value: 0, 
            label: "Bernie Sanders", 
            party: null,
        },{ 
            value: 1, 
            label: "Donald Trump", 
            party: null,
        }, { 
            value: 2, 
            label: "Gary Johnson", 
            party: null,
        }, { 
            value: 3, 
            label: "Hillary Clinton", 
            party: null,
        }, { 
            value: 4, 
            label: "Jill Stein", 
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


export var PRIMARYPRES: ElectOfficeGUI = 
    { 
	inner: PRIMPRESOFFICE,
	candidates: PRIMPRESCANDS
    }
