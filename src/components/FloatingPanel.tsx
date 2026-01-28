import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingPanelProps {
  onRelease: (text: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

const FloatingPanel = ({ onRelease, isVisible, onClose }: FloatingPanelProps) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isVisible]);

  const handleRelease = () => {
    if (text.trim()) {
      onRelease(text.trim());
      setText('');
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleRelease();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-panel rounded-2xl p-6 w-full max-w-md animate-float"
            initial={{ 
              scale: 0.8, 
              opacity: 0,
              y: 50,
              rotateX: 15,
            }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: 0,
              rotateX: 0,
            }}
            exit={{ 
              scale: 0.9, 
              opacity: 0,
              y: -30,
              rotateX: -10,
            }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Subtle top glow */}
            <div 
              className="absolute -top-px left-4 right-4 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(var(--glow-primary) / 0.5), transparent)',
              }}
            />
            
            <div className="relative">
            <p className="text-muted-foreground text-sm mb-4 text-center">
              Release your thoughts into the cosmos
            </p>
              
              <textarea
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter words to let go..."
                className="w-full bg-transparent border border-border/50 rounded-xl px-4 py-3 
                         text-foreground placeholder:text-muted-foreground/50
                         focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30
                         resize-none transition-all duration-300"
                rows={3}
                style={{
                  textShadow: text ? '0 0 10px hsl(var(--glow-primary) / 0.3)' : 'none',
                }}
              />
              
              <motion.button
                onClick={handleRelease}
                disabled={!text.trim()}
                className="mt-4 w-full py-3 rounded-xl font-medium
                         bg-primary/20 border border-primary/30 text-primary
                         hover:bg-primary/30 hover:border-primary/50
                         disabled:opacity-30 disabled:cursor-not-allowed
                         transition-all duration-300 glow-box"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="glow-text">Release</span>
              </motion.button>
              
              <p className="text-muted-foreground/50 text-xs mt-3 text-center">
                Enter to send · Esc to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingPanel;
