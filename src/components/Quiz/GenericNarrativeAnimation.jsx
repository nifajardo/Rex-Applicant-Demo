import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, BarChart3, Landmark, Briefcase, Users, CheckCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.2,
    },
  },
};

const AnimatedScene = ({ icon, text }) => (
  <motion.div className="flex items-start space-x-6 p-4" variants={itemVariants}>
    <motion.div className="p-4 bg-primary/10 rounded-full" variants={iconVariants}>
      {icon}
    </motion.div>
    <div>
      <p className="text-muted-foreground leading-relaxed text-lg">{text}</p>
    </div>
  </motion.div>
);

const GenericNarrativeAnimation = ({ narrative }) => {
  // Split the narrative into sentences to create scenes.
  // This regex handles sentences ending with '.', '!', '?' and followed by a space or end of string.
  const sentences = narrative.split(/(?<=[.!?])\s+/).filter(Boolean);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {sentences.map((sentence, index) => (
        <AnimatedScene 
          key={index} 
          icon={<Lightbulb className="w-8 h-8 text-primary" />} 
          text={sentence} 
        />
      ))}
    </motion.div>
  );
};

export default GenericNarrativeAnimation;