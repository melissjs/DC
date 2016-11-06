import {Candidate} from './candidate';

export interface OfficeVoteRecord {
voteRecordKey: string;
electOfficeKey: string;
success: boolean;
candidate: string;
levelOfSupport: string;
}