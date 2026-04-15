'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { keys: ['N'], description: 'Focus input to add a new task' },
  { keys: ['?'], description: 'Toggle keyboard shortcuts window' },
  { keys: ['Esc'], description: 'Close this window / cancel editing' },
  { keys: ['1'], description: 'Switch to All filter' },
  { keys: ['2'], description: 'Switch to Active filter' },
  { keys: ['3'], description: 'Switch to Completed filter' },
  { keys: ['X'], description: 'Clear all completed tasks' },
  { keys: ['Enter'], description: 'Submit new task / save edit' },
];

export default function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto overflow-hidden"
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Keyboard Shortcuts</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Speed up your workflow</p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                  aria-label="Close shortcuts"
                  whileTap={{ scale: 0.88 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Shortcuts list */}
              <div className="px-6 py-4 space-y-1">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={shortcut.description}
                    className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.06 + index * 0.04,
                      duration: 0.28,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    <span className="text-sm text-gray-600">{shortcut.description}</span>
                    <div className="flex gap-1 ml-4 flex-shrink-0">
                      {shortcut.keys.map((key) => (
                        <kbd
                          key={key}
                          className="inline-flex items-center justify-center min-w-[28px] h-7 px-1.5 bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold rounded-lg font-mono shadow-sm"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">
                  Press <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold rounded font-mono">?</kbd> anytime to open this window
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
