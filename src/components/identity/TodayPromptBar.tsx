import { PlayCircle } from 'lucide-react';

interface TodayPromptBarProps {
    label: string;
}

export const TodayPromptBar = ({ label }: TodayPromptBarProps) => {
    return (
        <div className="mx-4 mt-8 bg-indigo-50 rounded-xl p-4 flex items-center justify-between border border-indigo-100">
            <div className="flex-1 pr-4">
                <p className="text-sm font-semibold text-indigo-900">
                    {label || "10 minutes today keeps your streak alive"}
                </p>
            </div>
            <button className="shrink-0 bg-indigo-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-1.5">
                <PlayCircle className="w-4 h-4 fill-indigo-200" />
                Start Now
            </button>
        </div>
    );
};
