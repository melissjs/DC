import {Candidate} from './candidate';

export interface Officevoterecord {
voteRecordKey: string;
office: string;
election: string;
success: boolean;
candidate: string;
levelOfSupport: string;
}