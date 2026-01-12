import { HelpCircle } from 'lucide-react';

interface TransparencyLinksProps {
    onLevelExplain: () => void;
    onEffortExplain: () => void;
    onHighlightsExplain: () => void;
}

export const TransparencyLinks = ({ onLevelExplain, onEffortExplain, onHighlightsExplain }: TransparencyLinksProps) => {
    const links = [
        { label: 'How Level works', onClick: onLevelExplain },
        { label: 'How Effort Score works', onClick: onEffortExplain },
        { label: 'Why this highlight appeared', onClick: onHighlightsExplain },
    ];

    return (
        <div className="mx-4 mt-8 mb-20 space-y-3">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">How it works</div>
            {links.map((link, idx) => (
                <button
                    key={idx}
                    onClick={link.onClick}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors text-left"
                >
                    <span className="text-sm font-medium text-gray-600">{link.label}</span>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                </button>
            ))}
        </div>
    );
};
