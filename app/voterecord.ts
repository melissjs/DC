export interface VoteRecord {
voteRecordKey: string;
volunteerKey: string;
gePresVoteCouldNotVote?: boolean;
gePresVoteCouldNotVoteReason?: string;
gePresVoteIntended?: string;
gePresVote?: string;
gePresVoteCastBy?: string;
gePresVoteLevelOfSupport?: string;
pPresVoteCouldNotVote?: boolean;
pPresVoteCouldNotVoteReason?: string;
pPresVoteIntended?: string;
pPresVoteDidNotVote?: boolean;
pPresVote?: string;
pPresVoteCastBy?: string;
pPresVoteLevelOfSupport?: string;
pPresVotePollingLocation?: string;
presFirst?: string;
presSecond?: string;
presThird?: string;
}  