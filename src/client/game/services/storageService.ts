import { VoteCounts, VoteType, UserSubmission, UserStats, CaseData, HistoryItem } from '../types';

export const getVotesForCase = (caseId: string | number, dateKey: string): VoteCounts => {
  const key = `votes_${dateKey}_${caseId}`;
  const stored = localStorage.getItem(key);
  if (stored) return JSON.parse(stored);

  const seeded: VoteCounts = {
    guilty: Math.floor(Math.random() * 100) + 50,
    not_guilty: Math.floor(Math.random() * 100) + 50,
    abstain: Math.floor(Math.random() * 20),
    total: 0,
  };
  seeded.total = seeded.guilty + seeded.not_guilty + seeded.abstain;
  localStorage.setItem(key, JSON.stringify(seeded));
  return seeded;
};

export const getUserVote = (caseId: string | number, dateKey: string): VoteType | null => {
  return localStorage.getItem(`user_vote_${dateKey}_${caseId}`) as VoteType | null;
};

const LEVEL_NAMES = [
  'Bystander',
  'Jury Duty',
  'Legal Clerk',
  'Public Defender',
  'District Attorney',
  'Judge',
  'Chief Justice',
];

export const getUserStats = (): UserStats => {
  const stored = localStorage.getItem('user_stats');
  if (stored) return JSON.parse(stored);

  return {
    karma: 0,
    streak: 0,
    level: LEVEL_NAMES[0] || 'Bystander',
    lastPlayed: '',
  };
};

export const getHistory = (): HistoryItem[] => {
  const stored = localStorage.getItem('played_history');
  return stored ? JSON.parse(stored) : [];
};

export const saveToHistory = (item: HistoryItem) => {
  const history = getHistory();
  // Avoid duplicates if user somehow submits twice
  const filtered = history.filter((h) => h.caseData.id !== item.caseData.id);
  localStorage.setItem('played_history', JSON.stringify([item, ...filtered]));
};

export const updateHistoryWithAi = (caseId: string | number, aiAnalysis: string) => {
  const history = getHistory();
  const index = history.findIndex((h) => h.caseData.id === caseId);
  if (index !== -1 && history[index]) {
    history[index].aiAnalysis = aiAnalysis;
    localStorage.setItem('played_history', JSON.stringify(history));
  }
};

export const submitVote = (
  caseId: string | number,
  dateKey: string,
  vote: VoteType
): VoteCounts => {
  const currentVotes = getVotesForCase(caseId, dateKey);
  const newVotes = { ...currentVotes };
  const key = vote as keyof VoteCounts;
  newVotes[key]++;
  newVotes.total++;
  localStorage.setItem(`votes_${dateKey}_${caseId}`, JSON.stringify(newVotes));
  localStorage.setItem(`user_vote_${dateKey}_${caseId}`, vote);

  // Update Stats & Streak
  const stats = getUserStats();
  const today = new Date().toDateString();

  if (stats.lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (stats.lastPlayed === yesterday.toDateString()) {
      stats.streak += 1;
    } else {
      stats.streak = 1;
    }
    stats.lastPlayed = today;
  }

  // Always update Karma (Grindable)
  stats.karma += 50 + stats.streak * 10;

  // Update Level
  const levelIdx = Math.min(Math.floor(stats.karma / 200), LEVEL_NAMES.length - 1);
  stats.level = LEVEL_NAMES[levelIdx] || 'Bystander';

  localStorage.setItem('user_stats', JSON.stringify(stats));

  return newVotes;
};

export const saveUGC = (submission: UserSubmission) => {
  const existing = JSON.parse(localStorage.getItem('ugc_cases') || '[]');
  existing.push(submission);
  localStorage.setItem('ugc_cases', JSON.stringify(existing));
};

export const getUGCForToday = (): CaseData | null => {
  const ugc = JSON.parse(localStorage.getItem('ugc_cases') || '[]');
  if (ugc.length === 0) return null;

  const dayOfWeek = new Date().getDay();
  const index = dayOfWeek % ugc.length;
  const submission = ugc[index];

  return {
    id: 1000 + index,
    title: submission.title,
    scenario: submission.scenario,
    evidence: [
      { id: 'ugc1', label: 'The Scenario', icon: '📝', text: submission.scenario },
      { id: 'ugc2', label: 'Context', icon: '🔍', text: `Submitted by u/${submission.author}` },
      {
        id: 'ugc3',
        label: 'Consider',
        icon: '⚖️',
        text: 'How would you rule on this community-submitted dilemma?',
      },
    ],
    verdictOptions: ['Guilty', 'Not Guilty', 'Abstain'],
    mockTopComment: {
      author: submission.author,
      text: "I submitted this case because I genuinely don't know the right answer. What does Reddit think?",
      score: 1,
    },
  };
};
