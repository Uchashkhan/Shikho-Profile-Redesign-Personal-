import type { UserProfile, Highlight } from '../../types/userProfile';
import { Crown, TrendingUp, Star, Trophy, Zap, Target, Award } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface HighlightsPanelProps {
    user: UserProfile;
    onSeeMore: () => void;
    onHighlightClick: (highlight: Highlight) => void;
}

const IconMap = {
    'crown': Crown,
    'trending-up': TrendingUp,
    'star': Star,
    'trophy': Trophy,
    'zap': Zap,
    'target': Target,
    'award': Award
};

const BadgeColorMap = {
    'crown': 'bg-amber-100 text-amber-600',
    'trending-up': 'bg-emerald-100 text-emerald-600',
    'star': 'bg-indigo-100 text-indigo-600',
    'trophy': 'bg-purple-100 text-purple-600',
    'zap': 'bg-yellow-100 text-yellow-600',
    'target': 'bg-rose-100 text-rose-600',
    'award': 'bg-blue-100 text-blue-600',
};

export const HighlightsPanel = ({ user, onSeeMore, onHighlightClick }: HighlightsPanelProps) => {
    const unlockedCount = user.highlights.filter(h => h.status === 'unlocked').length;
    const totalCount = 9; // Fixed inventory

    return (
        <div className="mx-4 mt-8">
            <div className="flex items-center justify-between mb-4 px-1">
                <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Collection
                    </h3>
                    <p className="text-xs text-gray-500">
                        {unlockedCount} / {totalCount} unlocked
                    </p>
                </div>

                <button
                    onClick={onSeeMore}
                    className="text-xs font-bold text-gray-400 p-2 hover:bg-gray-50 rounded-full"
                >
                    <InfoIcon />
                </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {user.highlights.map((h) => {
                    const isLocked = h.status === 'locked';
                    const Icon = IconMap[h.icon] || Star;

                    // Locked state: Muted background, desaturated icon
                    const colorClass = isLocked
                        ? 'bg-gray-100 text-gray-400 grayscale'
                        : (BadgeColorMap[h.icon] || BadgeColorMap['star']);

                    return (
                        <motion.button
                            key={h.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onHighlightClick(h)}
                            className="group flex flex-col items-center text-center gap-2"
                        >
                            {/* Icon Container */}
                            <div className={clsx(
                                "w-full aspect-square rounded-3xl flex items-center justify-center text-3xl shadow-sm transition-all relative overflow-hidden",
                                colorClass,
                                !isLocked && "group-hover:shadow-md group-hover:-translate-y-1"
                            )}>
                                {/* Shine effect for unlocked */}
                                {!isLocked && (
                                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}

                                <Icon className="w-8 h-8 fill-current" />
                            </div>

                            {/* Text */}
                            <div>
                                <h4 className={clsx(
                                    "text-xs font-bold leading-tight",
                                    isLocked ? "text-gray-500" : "text-gray-900"
                                )}>
                                    {h.title}
                                </h4>
                                <p className={clsx(
                                    "text-[9px] font-medium mt-0.5",
                                    isLocked ? "text-indigo-400" : "text-gray-400"
                                )}>
                                    {isLocked ? "Tap to see how" : h.dateLabel}
                                </p>
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

const InfoIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
    </svg>
)
