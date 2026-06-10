import React from 'react';
import { motion } from 'framer-motion';
import { BookMarked, ShieldCheck, Link, Target, PenTool, Users, Scale, HeartHandshake as Handshake } from 'lucide-react';

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

const AnimatedScene = ({ icon, title, text }) => (
  <motion.div className="flex items-start space-x-6 p-4" variants={itemVariants}>
    <motion.div className="p-4 bg-primary/10 rounded-full" variants={iconVariants}>
      {icon}
    </motion.div>
    <div>
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{text}</p>
    </div>
  </motion.div>
);

const NarrativeAnimation = () => {
  const scenes = [
    {
      icon: <BookMarked className="w-8 h-8 text-primary" />,
      title: 'What is Academic Writing?',
      text: 'A formal style used in universities, emphasizing clarity, evidence-based arguments, and objectivity. It avoids personal bias and relies on credible sources.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: 'The Core of Research Ethics',
      text: 'The moral principles guiding scholarly research. It ensures integrity, transparency, and respect for intellectual property.',
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Ethical Practices in Action',
      text: 'This means avoiding plagiarism, fabricating data, respecting confidentiality, and obtaining informed consent from human subjects.',
    },
    {
      icon: <Link className="w-8 h-8 text-primary" />,
      title: 'Stronger Together',
      text: 'Together, academic writing and research ethics uphold the credibility of all scholarly work, fostering a culture of trust, fairness, and intellectual honesty.',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {scenes.map((scene, index) => (
        <AnimatedScene key={index} icon={scene.icon} title={scene.title} text={scene.text} />
      ))}
    </motion.div>
  );
};

export default NarrativeAnimation;