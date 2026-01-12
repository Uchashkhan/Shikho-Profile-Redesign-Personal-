export type Tier = 'Honor' | 'Elite' | 'Legend';

export interface Highlight {
  id: string;
  title: string;
  description: string;
  dateLabel: string; // e.g., "Last week" or specific date
  icon: 'crown' | 'trending-up' | 'star' | 'trophy' | 'zap' | 'target' | 'award';
  status: 'locked' | 'unlocked';
}

export interface Milestone {
  pct: number;
  label: string;
  status: 'locked' | 'unlocked' | 'next';
}

export interface Reward {
  title: string;
  shortDescription: string;
}

export interface PaidJourney {
  yearProgressPct: number;
  milestones: Milestone[];
  rewardAt100: Reward;
}

export interface MembershipStatus {
  currentTier: Tier | 'none';
  nextTiersPreview: Tier[];
  hintText: string;
}

export interface UserProfile {
  id: string;
  name: string;
  photoUrl?: string; // Optional URL for avatar image
  initials: string;  // Fallback if no photo
  classLabel: string;
  boardLabel: string;
  shikhoAgeText: string; // e.g., "Learning with Shikho for 1 year 3 months"

  level: number;       // 1-10
  levelProgressPct: number; // 0-100

  streakDays: number;
  monthlyConsistencyDays: number; // Out of 30

  effortToday: number;      // 0-100
  effortWeeklyPeak: number; // 0-100
  effortMonthlyAvg: number; // 0-100
  dailyEffort: number[];    // Last 7 days, ending with Today

  highlights: Highlight[]; // 3-5 items

  dailyActivity: string[]; // ISO Date strings "YYYY-MM-DD" of active days

  isPaid: boolean;
  paidJourney?: PaidJourney;     // Only if paid
  membership?: MembershipStatus; // Conditional
}
