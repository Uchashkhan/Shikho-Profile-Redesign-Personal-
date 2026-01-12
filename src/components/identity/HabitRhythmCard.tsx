import { useState } from 'react';
import type { UserProfile } from '../../types/userProfile';
import { Flame } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface HabitRhythmCardProps {
    user: UserProfile;
}

// Helpers
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getDayOfWeek = (year: number, month: number, day: number) => new Date(year, month, day).getDay(); // 0 = Sun

// Mock "Today" as 2026-01-07 for consistency with Data
const TODAY = new Date('2026-01-07T00:00:00');
const CURRENT_YEAR = TODAY.getFullYear();
const CURRENT_MONTH = TODAY.getMonth(); // 0 = Jan
const CURRENT_DATE = TODAY.getDate();

export const HabitRhythmCard = ({ user }: HabitRhythmCardProps) => {
    const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

    // Parse active dates
    const activeSet = new Set(user.dailyActivity);
    const isActive = (d: number, m: number, y: number) => {
        const iso = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        return activeSet.has(iso);
    };

    // --- WEEK VIEW LOGIC ---
    // Simple: Show current week (Mon-Sun).
    // Jan 7 2026 is Wed. 
    // Mon=5, Tue=6, Wed=7, Thu=8, Fri=9, Sat=10, Sun=11
    const weekDays = [
        { label: 'M', date: 5 },
        { label: 'T', date: 6 },
        { label: 'W', date: 7 },
        { label: 'T', date: 8 },
        { label: 'F', date: 9 },
        { label: 'S', date: 10 },
        { label: 'S', date: 11 },
    ];

    // --- MONTH VIEW LOGIC ---
    const daysInMonth = getDaysInMonth(CURRENT_YEAR, CURRENT_MONTH);
    const startDayOffset = getDayOfWeek(CURRENT_YEAR, CURRENT_MONTH, 1); // 0=Sun. Adjust for Mon start?
    // Let's assume Mon start for calendar grid
    // 0=Sun, 1=Mon... 
    // If Mon start: Mon=0, Tue=1... Sun=6.
    // Standard JS: Sun=0.
    // Offset = (day + 6) % 7 for Mon start
    const gridStartOffset = (startDayOffset + 6) % 7;

    const monthParam = {
        name: 'January 2026',
        days: Array.from({ length: daysInMonth }, (_, i) => i + 1)
    };

    return (
        <div className="mx-4 mt-6">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className="text-sm font-bold text-gray-900">
                        {viewMode === 'week' ? 'Weekly Activity' : 'Monthly Consistency'}
                    </h3>
                    <p className="text-xs text-gray-500">
                        {viewMode === 'week' ? 'This week so far' : monthParam.name}
                    </p>
                </div>

                {/* Toggle */}
                <div className="bg-gray-100 p-0.5 rounded-lg flex text-xs font-semibold">
                    <button
                        onClick={() => setViewMode('week')}
                        className={clsx(
                            "px-3 py-1.5 rounded-md transition-all",
                            viewMode === 'week' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => setViewMode('month')}
                        className={clsx(
                            "px-3 py-1.5 rounded-md transition-all",
                            viewMode === 'month' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        Month
                    </button>
                </div>
            </div>

            {/* Card Content */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">

                {viewMode === 'week' ? (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col gap-4"
                    >
                        {/* Week Strip */}
                        <div className="grid grid-cols-7 gap-2">
                            {weekDays.map((d, i) => {
                                const active = isActive(d.date, CURRENT_MONTH, CURRENT_YEAR);
                                const isToday = d.date === CURRENT_DATE;
                                const isFuture = d.date > CURRENT_DATE;

                                return (
                                    <div key={i} className="flex flex-col items-center gap-1.5">
                                        <span className="text-[10px] text-gray-400 font-bold">{d.label}</span>
                                        <div className={clsx(
                                            "w-8 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all border",
                                            isToday ? "border-indigo-500 ring-1 ring-indigo-200" : "border-transparent",
                                            active ? "bg-indigo-600 text-white" :
                                                isFuture ? "bg-gray-50 text-gray-300" :
                                                    "bg-gray-100 text-gray-400"
                                        )}>
                                            {active ? <Flame className="w-4 h-4 fill-white" /> : d.date}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-1 border-t border-gray-50">
                            <p className="text-xs text-gray-600 font-medium">
                                You're building momentum!
                            </p>
                            {user.streakDays > 1 && (
                                <div className="flex items-center gap-1 text-xs text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded-full">
                                    <Flame className="w-3 h-3 fill-orange-500" />
                                    {user.streakDays} day streak
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    >
                        {/* Month Grid */}
                        <div className="grid grid-cols-7 gap-y-3 gap-x-1 mb-2">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                                <div key={i} className="text-center text-[10px] text-gray-400 font-bold">{d}</div>
                            ))}

                            {/* Spacers */}
                            {Array.from({ length: gridStartOffset }).map((_, i) => (
                                <div key={`spacer-${i}`} />
                            ))}

                            {/* Days */}
                            {monthParam.days.map((date) => {
                                const active = isActive(date, CURRENT_MONTH, CURRENT_YEAR);
                                const isToday = date === CURRENT_DATE;
                                const isFuture = date > CURRENT_DATE;

                                // Check streak connectivity (prev/next)
                                const prevActive = date > 1 && isActive(date - 1, CURRENT_MONTH, CURRENT_YEAR);
                                const nextActive = date < daysInMonth && isActive(date + 1, CURRENT_MONTH, CURRENT_YEAR);

                                return (
                                    <div key={date} className="relative flex items-center justify-center h-8">
                                        {/* Connecting Bands */}
                                        {active && prevActive && !isFuture && (
                                            <div className="absolute left-0 w-1/2 h-6 bg-indigo-100 -z-0" />
                                        )}
                                        {active && nextActive && !isFuture && (
                                            <div className="absolute right-0 w-1/2 h-6 bg-indigo-100 -z-0" />
                                        )}

                                        {/* Dot */}
                                        <div className={clsx(
                                            "relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all border-2",
                                            isToday ? "border-indigo-500" : "border-transparent",
                                            active ? "bg-indigo-600 text-white shadow-sm" :
                                                isFuture ? "text-gray-200" :
                                                    "text-gray-400"
                                        )}>
                                            {date}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="mt-3 text-center">
                            <p className="text-xs text-gray-500">
                                You've been active on <span className="font-bold text-gray-900">{user.dailyActivity.length} days</span> this month
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
