import type { UserProfile } from '../../types/userProfile';
import { motion } from 'framer-motion';

interface IdentityHeaderProps {
    user: UserProfile;
}

export const IdentityHeader = ({ user }: IdentityHeaderProps) => {
    return (
        <div className="sticky top-0 z-50 bg-gradient-to-br from-[#EEF2FF] to-[#F5F3FF] backdrop-blur-md border-b border-indigo-50/50 pb-6 pt-12 px-5 transition-all">
            <div className="flex items-end gap-5 mb-6">
                {/* Avatar - Minimal & Clean */}
                <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center overflow-hidden border border-indigo-100/50 shadow-sm ring-4 ring-white/40">
                        {user.photoUrl ? (
                            <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-2xl font-medium text-gray-400">{user.initials}</span>
                        )}
                    </div>
                </div>

                {/* Identity Info - Spacing & Hierarchy */}
                <div className="flex-1 min-w-0 pb-1">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight mb-1 truncate">
                        {user.name}
                    </h1>

                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <span className="text-indigo-600">Level {user.level} Scholar</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{user.classLabel}</span>
                    </div>
                </div>
            </div>

            {/* Progress - Supportive & Subtle */}
            <div className="space-y-2">
                <div className="flex justify-between items-baseline px-0.5">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                        Progress to Level {user.level + 1}
                    </span>
                    <span className="text-xs font-semibold text-gray-900 tabular-nums">
                        {user.levelProgressPct}%
                    </span>
                </div>

                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${user.levelProgressPct}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-indigo-600 rounded-full opacity-90"
                    />
                </div>
            </div>
        </div>
    );
};
