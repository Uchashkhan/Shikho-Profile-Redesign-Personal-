import { ArrowLeft, Sparkles } from 'lucide-react';
import type { UserProfile } from '../types/userProfile';

interface HighlightsHistoryProps {
    user: UserProfile;
    onBack: () => void;
}

export const HighlightsHistory = ({ user, onBack }: HighlightsHistoryProps) => {
    return (
        <div className="bg-white min-h-screen max-w-[420px] mx-auto border-x border-gray-100">
            <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10 flex items-center gap-3">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">All Highlights</h1>
            </div>

            <div className="p-4 space-y-4">
                {user.highlights.map((h, idx) => (
                    <div key={idx} className="p-4 border border-gray-100 rounded-xl shadow-sm bg-white flex gap-3">
                        <div className="mt-1">
                            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{h.dateLabel}</div>
                            <h3 className="font-bold text-gray-900 mb-1">{h.title}</h3>
                            <p className="text-sm text-gray-600">{h.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
