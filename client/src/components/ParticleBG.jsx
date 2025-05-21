import React from 'react';
import { motion } from "framer-motion";

const ParticleBG = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {[...Array(120)].map((_, i) => {
        // Generate random positions and sizes
        const size = 2 + Math.random() * 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 10 + Math.random() * 15;
        
        return (
          <motion.div
            key={i}
            initial={{
              y: 0,
              x: 0,
              opacity: 0,
              scale: 1,
            }}
            animate={{
              y: [-50 + Math.random() * 100, -150 + Math.random() * 300],
              x: [-30 + Math.random() * 60, -60 + Math.random() * 120],
              opacity: [0, 0.2 + Math.random() * 0.3, 0],
              scale: [1, 0.8 + Math.random() * 0.6],
            }}
            transition={{
              delay,
              duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              backgroundColor: "#007ACC",
            }}
          />
        );
      })}
    </div>
  );
};

export default ParticleBG;