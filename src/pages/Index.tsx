import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Starfield from '@/components/Starfield';
import FloatingPanel from '@/components/FloatingPanel';
import FlyingText from '@/components/FlyingText';
import TapPrompt from '@/components/TapPrompt';

interface ReleasedText {
  id: string;
  text: string;
}

const Index = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [releasedTexts, setReleasedTexts] = useState<ReleasedText[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleTap = useCallback(() => {
    if (!isPanelVisible) {
      setHasInteracted(true);
      setIsPanelVisible(true);
    }
  }, [isPanelVisible]);

  const handleRelease = useCallback((text: string) => {
  const audio = new Audio('/wasurete.m4a');
  audio.playbackRate = 0.667;
  audio.play();
  const id = `${Date.now()}-${Math.random()}`;
  setReleasedTexts((prev) => [...prev, { id, text }]);
}, []);

  const handleTextComplete = useCallback((id: string) => {
    setReleasedTexts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <motion.div 
      className="relative min-h-screen w-full cursor-pointer overflow-hidden"
      onClick={handleTap}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Immersive starfield background */}
      <Starfield />

      {/* Subtle camera drift effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{
          x: [0, 2, -1, 1, 0],
          y: [0, -1, 2, -1, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Center vanishing point indicator - very subtle */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-1 h-1 rounded-full pointer-events-none z-10"
        style={{
          backgroundColor: 'hsl(var(--glow-primary) / 0.3)',
          boxShadow: `
            0 0 30px 10px hsl(var(--glow-primary) / 0.1),
            0 0 60px 20px hsl(var(--glow-primary) / 0.05)
          `,
        }}
      />

      {/* Flying released texts */}
      <AnimatePresence>
        {releasedTexts.map((item) => (
          <FlyingText
            key={item.id}
            id={item.id}
            text={item.text}
            onComplete={handleTextComplete}
          />
        ))}
      </AnimatePresence>

      {/* Floating input panel */}
      <FloatingPanel
        isVisible={isPanelVisible}
        onRelease={handleRelease}
        onClose={() => setIsPanelVisible(false)}
      />

      {/* Tap prompt */}
      <TapPrompt isVisible={!hasInteracted} />

      {/* Ambient message - appears after interaction */}
      <AnimatePresence>
        {hasInteracted && !isPanelVisible && releasedTexts.length === 0 && (
          <motion.p
            className="fixed bottom-8 left-1/2 -translate-x-1/2 
                       text-muted-foreground/40 text-xs tracking-wider z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Tap anywhere to continue
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Index;
