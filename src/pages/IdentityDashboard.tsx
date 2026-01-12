import { useState } from 'react';
import clsx from 'clsx';

import { IdentityHeader } from '../components/identity/IdentityHeader';
import { HabitRhythmCard } from '../components/identity/HabitRhythmCard';
import { EffortScoreCard } from '../components/identity/EffortScoreCard';
import { HighlightsPanel } from '../components/identity/HighlightsPanel';
import { PaidJourneyCard } from '../components/identity/PaidJourneyCard';
import { MembershipCard } from '../components/identity/MembershipCard';
import { TodayPromptBar } from '../components/identity/TodayPromptBar';
import { TransparencyLinks } from '../components/identity/TransparencyLinks';
import { BottomSheet } from '../components/common/BottomSheet';

import type { UserProfile, Highlight } from '../types/userProfile';

interface IdentityDashboardProps {
    user: UserProfile;
    onNavigateHistory: () => void;
    onNavigateEffort: () => void;
}

export const IdentityDashboard = ({ user, onNavigateHistory, onNavigateEffort }: IdentityDashboardProps) => {
    // Sheet States
    const [activeSheet, setActiveSheet] = useState<null | 'effort' | 'level' | 'highlight'>(null);
    const [selectedHighlight, setSelectedHighlight] = useState<null | Highlight>(null);

    const handleHighlightClick = (h: Highlight) => {
        setSelectedHighlight(h);
        setActiveSheet('highlight');
    };

    return (
        <div className="bg-white min-h-screen pb-10 max-w-[420px] mx-auto border-x border-gray-100 shadow-2xl relative">
            <IdentityHeader user={user} />

            <HabitRhythmCard user={user} />

            <EffortScoreCard
                user={user}
                onNavigate={onNavigateEffort}
            />

            <HighlightsPanel
                user={user}
                onSeeMore={onNavigateHistory}
                onHighlightClick={handleHighlightClick}
            />

            <PaidJourneyCard user={user} />

            <MembershipCard user={user} />

            <TodayPromptBar label="10 minutes today keeps your streak alive" />

            <TransparencyLinks
                onLevelExplain={() => setActiveSheet('level')}
                onEffortExplain={() => setActiveSheet('effort')}
                onHighlightsExplain={() => setActiveSheet('highlight')}
            />

            {/* Manual Verification Sheets */}
            <BottomSheet
                isOpen={activeSheet === 'effort'}
                onClose={() => setActiveSheet(null)}
                title="Effort Score"
            >
                <p className="text-gray-600 leading-relaxed mb-4">
                    Effort Score reflects your active learning. It's calculated daily based on:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                    <li>Time spent watching lessons</li>
                    <li>Quizzes completed and accuracy</li>
                    <li>Practice tasks and notes read</li>
                </ul>
                <button onClick={() => setActiveSheet(null)} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl">Got it</button>
            </BottomSheet>

            <BottomSheet
                isOpen={activeSheet === 'level'}
                onClose={() => setActiveSheet(null)}
                title="Learner Level"
            >
                <p className="text-gray-600 leading-relaxed">
                    Level up by earning XP from daily activities. Higher levels unlock fresher profile borders and bragging rights!
                </p>
            </BottomSheet>

            <BottomSheet
                isOpen={activeSheet === 'highlight'}
                onClose={() => { setActiveSheet(null); setSelectedHighlight(null); }}
                title={selectedHighlight ? (selectedHighlight.status === 'locked' ? "How to unlock" : "Why you got this") : "Highlights"}
            >
                {selectedHighlight ? (
                    <div className="text-center">
                        <div className={clsx(
                            "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl",
                            selectedHighlight.status === 'locked' ? "bg-gray-100 text-gray-400" : "bg-indigo-50 text-indigo-600"
                        )}>
                            {selectedHighlight.status === 'locked' ? '?' :
                                (selectedHighlight.icon === 'crown' ? '👑' :
                                    selectedHighlight.icon === 'trending-up' ? '📈' :
                                        selectedHighlight.icon === 'star' ? '⭐️' : '🏆')}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {selectedHighlight.status === 'locked' ? selectedHighlight.title : selectedHighlight.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed mb-6">
                            {selectedHighlight.description}
                            {selectedHighlight.status === 'unlocked' && (
                                <>.<br /><span className="text-sm text-gray-400 mt-1 block">Earned: {selectedHighlight.dateLabel}</span></>
                            )}
                        </p>

                        {selectedHighlight.status === 'locked' && (
                            <div className="text-xs text-indigo-600 bg-indigo-50 py-2 px-3 rounded-lg inline-block font-medium">
                                Keep learning to unlock this badge!
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-600 leading-relaxed">
                        We curate your best moments—like high scores, streaks, and early bird sessions—to celebrate your progress.
                    </p>
                )}
            </BottomSheet>
        </div>
    );
};
