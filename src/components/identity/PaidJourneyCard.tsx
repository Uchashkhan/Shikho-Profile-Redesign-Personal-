import type { UserProfile } from '../../types/userProfile';
import { Lock, CheckCircle2, Star, Circle } from 'lucide-react';
import clsx from 'clsx';

interface PaidJourneyCardProps {
    user: UserProfile;
}

export const PaidJourneyCard = ({ user }: PaidJourneyCardProps) => {
    if (!user.isPaid || !user.paidJourney) {
        return null; // Or teaser
    }

    const { yearProgressPct, milestones, rewardAt100 } = user.paidJourney;

    return (
        <div className="mx-4 mt-8 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 fill-indigo-600 text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-900">Your Journey</h3>
            </div>

            <div className="flex items-start justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">{yearProgressPct}%</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Year Completion</p>
                </div>
                <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-lg">
                    On Track
                </span>
            </div>

            <div className="relative pl-2 space-y-8">
                {/* Connector Line */}
                <div className="absolute left-[19px] top-4 bottom-10 w-0.5 bg-gray-100 -z-0" />

                {milestones.map((m, i) => {
                    const isUnlocked = m.status === 'unlocked';
                    const isNext = m.status === 'next';
                    const isLocked = m.status === 'locked';

                    return (
                        <div key={i} className="relative z-10 flex items-center gap-4">
                            {/* Icon */}
                            <div className={clsx(
                                "w-9 h-9 rounded-full flex items-center justify-center border-4 shadow-sm transition-all bg-white",
                                isUnlocked ? "border-indigo-100 text-indigo-600" :
                                    isNext ? "border-indigo-100 text-indigo-600 ring-2 ring-indigo-600 ring-offset-2" :
                                        "border-gray-50 text-gray-300"
                            )}>
                                {isUnlocked ? <CheckCircle2 className="w-5 h-5 fill-indigo-100" /> :
                                    isNext ? <Circle className="w-4 h-4 fill-indigo-600" /> :
                                        <Lock className="w-4 h-4" />}
                            </div>

                            {/* Content */}
                            <div className={clsx(
                                "flex-1 flex items-center justify-between p-3 rounded-xl transition-all",
                                isNext ? "bg-indigo-50/60" : ""
                            )}>
                                <span className={clsx(
                                    "text-sm font-bold",
                                    isLocked ? "text-gray-400" : "text-gray-900"
                                )}>
                                    {m.label}
                                </span>

                                {isNext && (
                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                                        Next Goal
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Reward Card */}
                <div className="relative z-10 flex items-center gap-4 pt-2">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-amber-100 text-amber-500 border-4 border-amber-50">
                        <Star className="w-4 h-4 fill-current" />
                    </div>

                    <div className="flex-1 bg-amber-50 rounded-xl p-3 border border-amber-100/50">
                        <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-0.5">
                            Reward at 100%
                        </div>
                        <div className="text-sm font-bold text-gray-900">
                            {rewardAt100.title}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
