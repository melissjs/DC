export interface VoteRecord {
voteRecordKey: string;
volunteerKey: string;
gePresVote?: string;
gePresVoteCastBy?: string;
gePresVoteLevelOfSupport?: string;
pPresVoteCouldNotVote?: boolean;
pPresVoteCouldNotVoteReason?: string;
pPresVoteIntended?: string;
pPresVote?: string;
pCongressVote?: string;
pPresVoteCastBy?: string;
pPresVoteLevelOfSupport?: string;
pPresVotePollingLocation?: string;
presFirst?: string;
presSecond?: string;
presThird?: string;
}  