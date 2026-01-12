import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const BottomSheet = ({ isOpen, onClose, title, children }: BottomSheetProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[101] max-h-[85vh] overflow-y-auto"
                        style={{ maxWidth: '420px', margin: '0 auto' }} // constraining width for desktop view of mobile app
                    >
                        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 flex items-center justify-between p-4 z-10">
                            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                        <div className="p-5 pb-10">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
