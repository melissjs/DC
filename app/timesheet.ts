import { PollingStation} from './pollingstation';
import { Volunteer} from './volunteer';

export interface Timesheet {
volunteerKey: string;
authenticatingVolunteerKey: string;
checkInTime: string;
checkOuttime: string;
geoLocation: string;
} 

