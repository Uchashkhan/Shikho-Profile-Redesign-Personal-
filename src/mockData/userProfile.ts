import type { UserProfile } from '../types/userProfile';

const commonHighlights = [
    { id: '1', title: 'Consistency King', description: '7-day learning streak achieved', dateLabel: 'Last week', icon: 'crown' as const, status: 'unlocked' as const },
    { id: '2', title: 'Fast Improver', description: 'Your effort jumped quickly', dateLabel: 'Today', icon: 'trending-up' as const, status: 'unlocked' as const },
    { id: '3', title: 'Start Strong', description: 'Completed first lesson', dateLabel: '2 days ago', icon: 'star' as const, status: 'unlocked' as const },
    { id: '4', title: 'Subject Master', description: 'Stay consistent in one subject', dateLabel: 'Locked', icon: 'trophy' as const, status: 'locked' as const },
    { id: '5', title: 'Deep Focus', description: 'Longer learning sessions unlock this', dateLabel: 'Locked', icon: 'star' as const, status: 'locked' as const },
    { id: '6', title: 'Quiz Whiz', description: 'Get 100% on 3 quizzes', dateLabel: 'Locked', icon: 'star' as const, status: 'locked' as const },
];

export const mockUserPaid: UserProfile = {
    id: 'u1',
    name: 'Rahim Ahmed',
    initials: 'RA',
    classLabel: 'Class 10',
    boardLabel: 'BV Board',
    shikhoAgeText: 'Learning with Shikho for 1 yr 3 mos',
    level: 4,
    levelProgressPct: 65,
    streakDays: 12,
    monthlyConsistencyDays: 24,
    effortToday: 85,
    effortWeeklyPeak: 92,
    effortMonthlyAvg: 78,
    dailyEffort: [45, 60, 75, 40, 92, 65, 85], // Last 7 days, today is 85
    dailyActivity: [
        '2026-01-01', '2026-01-02', '2026-01-03', // Streak from previous month?
        '2026-01-05', '2026-01-06', '2026-01-07', // Active Mon, Tue, Wed (Today)
        '2026-01-09', // Future mock? No, stick to past/today. 
        '2025-12-30', '2025-12-31'
    ],
    highlights: commonHighlights,
    isPaid: true,
    paidJourney: {
        yearProgressPct: 45,
        milestones: [
            { pct: 25, label: 'Q1 (25%)', status: 'unlocked' },
            { pct: 50, label: 'Q2 (50%)', status: 'next' },
            { pct: 75, label: 'Q3 (75%)', status: 'locked' },
            { pct: 100, label: 'Q4 (100%)', status: 'locked' },
        ],
        rewardAt100: {
            title: 'Exclusive Shikho Swag',
            shortDescription: 'Get a limited edition t-shirt!',
        },
    },
    membership: {
        currentTier: 'Honor',
        nextTiersPreview: ['Elite', 'Legend'],
        hintText: 'You are on the Honor tier. Keep going to reach Elite!',
    },
};

export const mockUserFree: UserProfile = {
    ...mockUserPaid,
    id: 'u2',
    name: 'Karim Islam',
    initials: 'KI',
    level: 2,
    levelProgressPct: 30,
    streakDays: 3,
    monthlyConsistencyDays: 10,
    dailyActivity: ['2026-01-02', '2026-01-05', '2026-01-07'],
    effortToday: 0, // No activity yet
    dailyEffort: [10, 20, 0, 15, 30, 0, 0], // Recent history but 0 today
    isPaid: false,
    paidJourney: undefined,
    membership: undefined,
};
