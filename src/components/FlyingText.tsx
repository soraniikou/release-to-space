import { motion } from 'framer-motion';

interface FlyingTextProps {
  id: string;
  text: string;
  onComplete: (id: string) => void;
}

const FlyingText = ({ id, text, onComplete }: FlyingTextProps) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-40"
      style={{
        perspective: '1000px',
        perspectiveOrigin: 'center center',
      }}
    >
      <motion.div
        className="text-2xl md:text-4xl font-light text-center px-4"
        style={{
          color: 'hsl(var(--glow-primary))',
          textShadow: `
            0 0 20px hsl(var(--glow-primary) / 0.9),
            0 0 40px hsl(var(--glow-primary) / 0.6),
            0 0 80px hsl(var(--glow-primary) / 0.4),
            0 0 120px hsl(var(--glow-secondary) / 0.3)
          `,
          transformStyle: 'preserve-3d',
        }}
        initial={{ 
          scale: 1, 
          opacity: 1,
          z: 0,
          filter: 'blur(0px)',
        }}
        animate={{ 
          scale: 0.01,
          opacity: 0,
          z: -2000,
          filter: 'blur(4px)',
        }}
        transition={{
          duration: 8.0,
          ease: [0.4, 0, 0.2, 1],
        }}
        onAnimationComplete={() => onComplete(id)}
      >
        {/* Light particle effect around text */}
        <motion.div
          className="absolute inset-0 -m-4"
          style={{
            background: 'radial-gradient(circle, hsl(var(--glow-primary) / 0.3) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={{
            scale: [1, 1.5, 0.5],
            opacity: [0.5, 0.8, 0],
          }}
          transition={{
            duration: 8.0,
            ease: 'easeOut',
          }}
        />
        
        <span className="relative">{text}</span>
      </motion.div>
      
      {/* Trailing light particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: 'hsl(var(--glow-primary))',
            boxShadow: '0 0 10px hsl(var(--glow-primary))',
            left: `${45 + Math.random() * 10}%`,
            top: `${45 + Math.random() * 10}%`,
          }}
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
          }}
          transition={{
            duration: 1.5,
            delay: 0.1 + i * 0.05,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  );
};

export default FlyingText;
