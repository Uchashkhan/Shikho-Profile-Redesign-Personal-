import { Zap, ArrowUp } from 'lucide-react';
import type { UserProfile } from '../../types/userProfile';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface EffortScoreCardProps {
    user: UserProfile;
    onNavigate: () => void;
}

export const EffortScoreCard = ({ user, onNavigate }: EffortScoreCardProps) => {
    // Data preparation
    const data = user.dailyEffort || [0, 0, 0, 0, 0, 0, 0];
    const maxVal = 100; // Fixed to 100 for percentage-based effort
    const todayScore = data[data.length - 1]; // Last item is today
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // Calculate average
    const avgScore = data.reduce((a, b) => a + b, 0) / data.length;
    const avgPct = (avgScore / maxVal) * 100;
    const isZeroState = avgScore === 0;
    const idealHeightPct = 60; // Represents the target zone height

    // Effort Zone Logic
    const getEffortZone = (score: number) => {
        if (score >= 76) return { label: 'High', copy: "High effort day — balance tomorrow." };
        if (score >= 41) return { label: 'Optimal', copy: "You’re in an optimal effort range today." };
        return { label: 'Light', copy: "You’re in a lighter effort range today." };
    };

    const currentZone = getEffortZone(todayScore);

    return (
        <div className="mx-4 mt-6 bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm">
            {/* Header / Stats */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Effort Score</h3>
                    <div className="flex items-baseline gap-1">
                        <Zap className="w-6 h-6 text-amber-500 fill-amber-500" />
                        <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            {todayScore.toFixed(0)}
                        </span>
                        <span className="text-lg font-medium text-gray-400">/ 100</span>
                    </div>
                    {/* Zone Label */}
                    <div className="mt-1">
                        <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider rounded-md">
                            {currentZone.label}
                        </span>
                    </div>
                </div>

                <div className="text-right">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Weekly Avg.</h3>
                    <div className="flex items-center justify-end gap-2">
                        <div className="h-4 w-1 bg-emerald-500 rounded-full" />
                        <span className="text-2xl font-bold text-gray-900">{avgScore.toFixed(0)}</span>
                    </div>
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-44 w-full mb-6">
                {/* Y-Axis Labels */}
                <div className="absolute right-0 top-0 text-[10px] font-bold text-gray-300">100</div>
                <div className="absolute right-0 bottom-6 text-[10px] font-bold text-gray-300">0</div>

                {/* Grid Lines - Explicitly rendered for visibility */}
                <div className="absolute inset-0 right-8 flex flex-col justify-between pointer-events-none pb-6 z-0">
                    <div className="w-full border-t border-dashed border-gray-300" />
                    <div className="w-full border-t border-dashed border-gray-200" />
                    <div className="w-full border-t border-dashed border-gray-200" />
                    <div className="w-full border-t border-dashed border-gray-300" />
                </div>

                {/* Target Zone Background */}
                <div className="absolute left-0 right-8 top-0 h-full flex flex-col justify-between pointer-events-none pb-6 z-0">
                    {/* The shaded green area representing "Good" zone */}
                    <div
                        className="w-full bg-emerald-50/40" // Removed border to avoid double lines with grid
                        style={{ height: `${idealHeightPct}%` }}
                    />
                </div>

                {/* Average Line */}
                <div
                    className="absolute left-0 right-8 border-t-2 border-dotted border-gray-500 z-10 flex justify-end pb-6"
                    style={{ bottom: `${avgPct}%` }}
                >
                    <span className="text-[9px] font-bold text-gray-500 bg-white px-1 -mt-2 mr-[-30px]">avg.</span>
                </div>

                {/* Bars Container */}
                <div className="absolute inset-0 right-8 top-0 bottom-6 flex items-end justify-between px-2 z-10">
                    {data.map((val, i) => {
                        const heightPct = Math.min((val / maxVal) * 100, 100); // Cap at 100
                        const isToday = i === data.length - 1;

                        return (
                            <div key={i} className="flex flex-col items-center gap-2 w-full h-full justify-end group">
                                {/* Bar */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${heightPct}%` }}
                                    transition={{ duration: 0.8, type: 'spring' }}
                                    className={clsx(
                                        "w-3 sm:w-4 rounded-t-lg transition-colors relative",
                                        isToday ? "bg-emerald-500" : "bg-emerald-400/80 hover:bg-emerald-400"
                                    )}
                                />

                                {/* Label */}
                                <div className="absolute -bottom-6 text-[10px] font-bold text-gray-400 flex flex-col items-center">
                                    <span>{days[i]}</span>
                                    {isToday && (
                                        <ArrowUp className="w-2.5 h-2.5 text-gray-900 mt-0.5" strokeWidth={3} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gray-100 mb-5 mt-8" />

            {/* Feedback / Insight */}
            <div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">
                    {currentZone.copy}
                </h4>

                <button
                    onClick={onNavigate}
                    className="mt-4 flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                    See effort by activity
                    <ArrowUp className="w-3 h-3 rotate-90" strokeWidth={3} />
                </button>
            </div>

            {/* CTA for Zero State */}
            {isZeroState && (
                <button className="w-full mt-4 bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200">
                    Start Learning Now
                </button>
            )}
        </div>
    );
};
