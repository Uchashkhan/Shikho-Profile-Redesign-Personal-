import { useState, useRef } from 'react';
import type { UserProfile } from '../../types/userProfile';
import { Crown, Lock, CheckCircle2, Star } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface MembershipCardProps {
    user: UserProfile;
    onLockedClick?: (tier: string) => void;
}

const tiers = [
    {
        name: 'Honor',
        id: 'Honor',
        colorClass: 'bg-gradient-to-br from-indigo-500 to-indigo-700 text-white',
        icon: Star,
        benefits: [
            'Renewal discounts (5%)',
            'Early access to features',
            'Priority learning benefits'
        ]
    },
    {
        name: 'Elite',
        id: 'Elite',
        colorClass: 'bg-gradient-to-br from-slate-700 to-slate-900 text-amber-100', // Dark contrast
        icon: Crown,
        benefits: [
            'Renewal discounts (15%)',
            'Earlier access to features',
            'Exclusive mock tests'
        ]
    },
    {
        name: 'Legend',
        id: 'Legend',
        colorClass: 'bg-gradient-to-br from-gray-900 to-black text-rose-100',
        icon: Crown,
        benefits: [
            'Renewal discounts (25%)',
            'First access to features',
            'Exclusive exams & national mocks'
        ]
    }
];

export const MembershipCard = ({ user, onLockedClick }: MembershipCardProps) => {
    if (!user.membership) return null;

    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Scroll detection to update active index
    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;

            // Cards are approx 90% width or fully centered, simplified:
            // Cards are approx 90% width or fully centered, simplified:

            // width * 0.8 is roughly card width + gap. 
            // Better: check which element center is closest to container center.
            // For standard snap-x, index ~= scrollLeft / itemWidth
            const cardWidth = 280; // approximate w-72ish
            const newIndex = Math.min(Math.max(Math.round(scrollLeft / cardWidth), 0), 2);
            if (newIndex !== activeIndex) {
                setActiveIndex(newIndex);
            }
        }
    };

    const isCurrentTier = (tierId: string) => user.membership?.currentTier === tierId;
    const isUnlocked = (tierId: string) => tierId === 'Honor' || user.membership?.currentTier === tierId; // Simplification: assume linear progression

    const activeTier = tiers[activeIndex];
    const activeIsLocked = !isUnlocked(activeTier.id);

    return (
        <div className="mt-8 overflow-hidden">
            <div className="px-5 mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-indigo-900 fill-indigo-900" />
                <h3 className="text-lg font-bold text-gray-900">Membership</h3>
            </div>

            {/* Cards Carousel */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-8 pb-6 no-scrollbar"
            >
                {tiers.map((tier) => {
                    const isLocked = !isUnlocked(tier.id);
                    const isCurrent = isCurrentTier(tier.id);

                    return (
                        <motion.div
                            key={tier.id}
                            className={clsx(
                                "snap-center shrink-0 w-[280px] h-[160px] rounded-3xl p-6 relative shadow-lg flex flex-col justify-between overflow-hidden",
                                tier.colorClass,
                                isLocked && "grayscale opacity-80"
                            )}
                            onClick={() => isLocked && onLockedClick && onLockedClick(tier.name)}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Background Texture */}
                            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                            <div className="flex justify-between items-start z-10">
                                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <tier.icon className="w-5 h-5 fill-white/50" />
                                </div>
                                {isCurrent && (
                                    <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-full backdrop-blur-md">
                                        Current Tier
                                    </span>
                                )}
                                {isLocked && (
                                    <Lock className="w-5 h-5 text-white/50" />
                                )}
                            </div>

                            <div className="z-10">
                                <h4 className="text-2xl font-bold tracking-tight">{tier.name}</h4>
                                {isLocked && (
                                    <p className="text-[10px] font-medium opacity-70 mt-1">
                                        {tier.id === 'Elite' ? 'Unlock with continued membership' : 'Unlock after long-term commitment'}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Benefits Panel */}
            <div className="mx-5 bg-gray-50 rounded-2xl p-5 border border-gray-100 transition-all">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    {activeTier.name} Benefits
                </h4>
                <div className="space-y-3">
                    {activeTier.benefits.map((benefit, i) => (
                        <div key={i} className={clsx(
                            "flex items-center gap-3",
                            activeIsLocked ? "opacity-50" : "opacity-100"
                        )}>
                            <div className={clsx(
                                "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                                activeIsLocked ? "bg-gray-200" : "bg-indigo-100"
                            )}>
                                {activeIsLocked ? (
                                    <Lock className="w-3 h-3 text-gray-400" />
                                ) : (
                                    <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                                )}
                            </div>
                            <span className="text-sm font-medium text-gray-700">{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
