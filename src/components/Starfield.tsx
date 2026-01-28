import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  brightness: number;
}

const Starfield = () => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      brightness: Math.random() * 0.5 + 0.5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 perspective-deep overflow-hidden">
      {/* Deep space background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, hsl(280 60% 8% / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, hsl(200 80% 8% / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(220 20% 4%) 0%, hsl(220 20% 2%) 100%)
          `,
        }}
      />
      
      {/* Distant nebula hints */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          left: '20%',
          top: '30%',
          background: 'radial-gradient(ellipse, hsl(280 60% 30% / 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          right: '15%',
          bottom: '20%',
          background: 'radial-gradient(ellipse, hsl(200 80% 40% / 0.3) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      {/* Stars container with 3D perspective */}
      <div className="absolute inset-0 preserve-3d">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: `hsl(200 100% ${80 + star.brightness * 20}%)`,
              boxShadow: `
                0 0 ${star.size * 2}px hsl(185 100% 70% / ${star.brightness * 0.8}),
                0 0 ${star.size * 4}px hsl(185 100% 60% / ${star.brightness * 0.4})
              `,
            }}
            initial={{ 
              z: -500, 
              opacity: 0,
              scale: 0.1,
            }}
            animate={{ 
              z: [500, -500],
              opacity: [0, 1, 1, 0],
              scale: [0.1, 1, 1.5, 3],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Central light trail effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 20% 100% at 50% 50%, 
              hsl(185 100% 60% / 0.03) 0%, 
              transparent 70%
            )
          `,
        }}
      />

      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(220 20% 2%) 100%)',
        }}
      />
    </div>
  );
};

export default Starfield;
