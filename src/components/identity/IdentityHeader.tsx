import type { UserProfile } from '../../types/userProfile';
import { motion } from 'framer-motion';

interface IdentityHeaderProps {
    user: UserProfile;
}

export const IdentityHeader = ({ user }: IdentityHeaderProps) => {
    return (
        <div className="sticky top-0 z-50 bg-[#F9FAFB]/95 backdrop-blur-md border-b border-gray-100 pb-6 pt-10 px-6 transition-all">
            <div className="flex items-start gap-4 mb-5">
                {/* Avatar - Minimal & Clean */}
                <div className="relative shrink-0 pt-1">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                        {user.photoUrl ? (
                            <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xl font-semibold text-gray-500">{user.initials}</span>
                        )}
                    </div>
                </div>

                {/* Identity Info - Spacing & Hierarchy */}
                <div className="flex-1 min-w-0 space-y-1">
                    <h1 className="text-xl font-bold text-gray-900 leading-tight tracking-tight truncate">
                        {user.name}
                    </h1>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{user.classLabel}</span>
                        <span className="w-0.5 h-0.5 rounded-full bg-gray-400" />
                        <span>{user.boardLabel}</span>
                    </div>

                    {user.shikhoAgeText && (
                        <p className="text-xs text-gray-400 font-medium pt-0.5">
                            {user.shikhoAgeText}
                        </p>
                    )}
                </div>
            </div>

            {/* Level & Progress - Supportive & Subtle */}
            <div className="space-y-3">
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                            Level {user.level}
                        </div>
                        <div className="text-[10px] text-gray-400 font-medium">
                            {user.levelProgressPct}% to Level {user.level + 1}
                        </div>
                    </div>
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
