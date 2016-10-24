import { Volunteer} from './volunteer';

export interface PollingStation {
pollingStationKey: string;
precinctNumber: string;
streetAddress: string;
unitNumber?: string;
roomNumber?: string;
city: string;
state: string;
zip: number;
}  