export interface Evidence {
  id: string;
  label: string;
  icon: string;
  text: string;
}

export interface CaseData {
  id: string | number;
  title: string;
  scenario: string;
  evidence: Evidence[];
  verdictOptions: string[];
  mockTopComment: {
    author: string;
    text: string;
    score: number;
  };
  aiAnalysis?: string;
}

export type VoteType = 'guilty' | 'not_guilty' | 'abstain';

export interface VoteCounts {
  guilty: number;
  not_guilty: number;
  abstain: number;
  total: number;
}

export interface UserSubmission {
  title: string;
  scenario: string;
  author: string;
  timestamp: number;
}

export interface UserStats {
  karma: number;
  streak: number;
  level: string;
  lastPlayed: string;
}

export interface HistoryItem {
  caseData: CaseData;
  userVote: VoteType;
  timestamp: number;
  results: VoteCounts;
  aiAnalysis?: string;
}
