import {Candidate} from './candidate';

export interface OfficeVoteRecord {
voteRecordKey: string;
office: string;
election: string;
success: boolean;
candidate: string;
levelOfSupport: string;
}