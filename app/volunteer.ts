// import { PollingStation} from './pollingstation';

export interface Volunteer {
volunteerKey: string;
fullName: string;
emailAddress: string;
exposeEmail: boolean;
phoneNumber: string;
age: number;
sex: string;
partyAffiliation: string;
shifts?: string;
passcode: string;
associatedPollingStationKey?: string;
} 

