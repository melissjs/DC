export interface VoteRecord {
voteRecordKey: string;
volunteerKey: string;
generalSuccess: boolean;
generalCouldNotVoteReason?: string;
generalCastBy?: string;
primarySuccess?: boolean;
primaryCouldNotVoteReason?: string;
primaryCastBy?: string;
primaryVotePollingLocation?: string;
presFirst?: string;
presSecond?: string;
presThird?: string;
}  