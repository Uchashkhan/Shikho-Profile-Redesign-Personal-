import type { UserProfile } from '../../types/userProfile';
import { Flame, CalendarCheck } from 'lucide-react';

interface StreaksConsistencyProps {
    user: UserProfile;
}

export const StreaksConsistency = ({ user }: StreaksConsistencyProps) => {
    return (
        <div className="px-4 py-4 flex gap-3 overflow-x-auto no-scrollbar">
            {/* Streak Chip */}
            <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-2 rounded-xl text-sm font-semibold border border-orange-100 shrink-0">
                <Flame className="w-4 h-4 fill-orange-500 text-orange-600" />
                <span>{user.streakDays} days streak</span>
            </div>

            {/* Consistency Chip */}
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-xl text-sm font-semibold border border-green-100 shrink-0">
                <CalendarCheck className="w-4 h-4 text-green-600" />
                <span>{user.monthlyConsistencyDays} / 30 days</span>
            </div>
        </div>
    );
};
