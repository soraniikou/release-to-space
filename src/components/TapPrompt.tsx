import { motion } from 'framer-motion';

interface TapPromptProps {
  isVisible: boolean;
}

const TapPrompt = ({ isVisible }: TapPromptProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.div
        className="flex flex-col items-center gap-3"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Pulsing ring */}
        <motion.div
          className="relative w-16 h-16 flex items-center justify-center"
        >
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-primary/50"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.2,
            }}
          />
          <div 
            className="w-3 h-3 rounded-full bg-primary/60"
            style={{
              boxShadow: '0 0 15px hsl(var(--glow-primary) / 0.6)',
            }}
          />
        </motion.div>
        
        <p 
          className="text-muted-foreground text-sm tracking-widest uppercase"
          style={{
            textShadow: '0 0 20px hsl(var(--glow-primary) / 0.3)',
          }}
        >
          Tap to begin
        </p>
      </motion.div>
    </motion.div>
  );
};

export default TapPrompt;
