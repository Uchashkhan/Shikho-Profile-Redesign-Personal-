import { ArrowLeft, Play, Tv, BookOpen, Clock, Zap, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { UserProfile } from '../types/userProfile';

interface EffortBreakdownPageProps {
    user: UserProfile;
    onBack: () => void;
}

const FEATURES = [
    { id: 'live_class', label: 'Live Class', icon: Tv, color: 'bg-indigo-500' },
    { id: 'recorded_class', label: 'Recorded Class', icon: Play, color: 'bg-indigo-500' },
    { id: 'animated_lesson', label: 'Animated Lesson', icon: Zap, color: 'bg-indigo-500' },
    { id: 'live_exam', label: 'Live Exam', icon: Clock, color: 'bg-indigo-500' },
    { id: 'practice_mcq', label: 'Practice MCQ', icon: BookOpen, color: 'bg-indigo-500' },
    { id: 'shikho_ai', label: 'Shikho AI', icon: MessageSquare, color: 'bg-indigo-500' },
];

// Mock relative data generator (since we might not have granular data in the user object yet)
// In a real app, this would come from user.effortBreakdown or similar.
const getEffortLevel = (featureId: string) => {
    // Deterministic mock based on feature ID length for variety
    const hash = featureId.length % 4;
    switch (hash) {
        case 0: return { level: 3, label: 'High contribution' };
        case 1: return { level: 2, label: 'Moderate activity' };
        case 2: return { level: 1, label: 'Light usage' };
        default: return { level: 0, label: 'Not used today' };
    }
};

export const EffortBreakdownPage = ({ user, onBack }: EffortBreakdownPageProps) => {
    const todayScore = user.dailyEffort ? user.dailyEffort[user.dailyEffort.length - 1] : 0;

    return (
        <div className="bg-white min-h-screen pb-10 max-w-[420px] mx-auto border-x border-gray-100 shadow-2xl relative flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                <button
                    onClick={onBack}
                    className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex-1">
                    <h1 className="text-lg font-bold text-gray-900">Effort Breakdown</h1>
                </div>
            </div>

            <div className="px-5 py-6 flex-1 overflow-y-auto">
                {/* Subtitle & Helper */}
                <div className="mb-8">
                    <h2 className="text-gray-600 text-base leading-relaxed mb-6">
                        Your effort comes from different learning activities
                    </h2>

                    {/* Overall Reference */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm font-medium text-gray-500">
                        <span>Today's Effort:</span>
                        <span className="text-gray-900 font-bold">{todayScore.toFixed(0)} / 100</span>
                    </div>
                </div>

                {/* Feature List */}
                <div className="space-y-6">
                    {FEATURES.map((feature, index) => {
                        const { level, label } = getEffortLevel(feature.id);
                        const isZero = level === 0;
                        const barWidth = isZero ? '5%' : `${(level / 3) * 100}%`;

                        return (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-start gap-4"
                            >
                                {/* Icon */}
                                <div className={clsx(
                                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                                    isZero ? "bg-gray-50 text-gray-300" : "bg-indigo-50 text-indigo-600"
                                )}>
                                    <feature.icon className="w-5 h-5" strokeWidth={isZero ? 1.5 : 2} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 pt-1">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <span className={clsx(
                                            "text-sm font-medium",
                                            isZero ? "text-gray-400" : "text-gray-900"
                                        )}>
                                            {feature.label}
                                        </span>
                                    </div>

                                    {/* Relative Bar */}
                                    <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden mb-1.5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: barWidth }}
                                            transition={{ duration: 0.8, delay: 0.2 + (index * 0.05), type: "spring", bounce: 0 }}
                                            className={clsx(
                                                "h-full rounded-full opacity-80",
                                                isZero ? "bg-gray-200" : "bg-indigo-400"
                                            )}
                                        />
                                    </div>

                                    {/* Qualitative Label */}
                                    <span className="text-xs text-gray-400 font-medium">
                                        {label}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Interpretation Help (Trust Layer) */}
                <div className="mt-12 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-sm text-gray-500 text-center leading-relaxed">
                        Different learning days look different.<br />
                        Your effort doesn't need to be equal across all activities.
                    </p>
                </div>
            </div>
        </div>
    );
};
