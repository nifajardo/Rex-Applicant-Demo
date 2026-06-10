import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';

const historySlides = [
  {
    year: "REX Education Scholarship Program",
    title: "A Journey of Educational Empowerment",
    content: "Discover the history and milestones of the REX Education Scholarship Program, a beacon of hope for learners across our network.",
    image: "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/09bb1f69a4d9a82579d9e7dba0f362f9.jpg"
  },
  {
    year: "Overview",
    title: "Overview of the REX Education Scholarship Program",
    content: "The REX Education Scholarship Program is a flagship initiative from REX Education, created to address the needs of learners facing socio-economic challenges. It is designed to promote long-term self-reliance through holistic development and equitable access to quality education.",
    image: "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/26d9d3e54868e42f8a2d3d1921ff8693.jpg"
  },
  {
    year: "Inclusivity",
    title: "Inclusivity and Target Beneficiaries",
    content: "Inclusivity lies at the heart of the REX Education Scholarship Program. It is open to all genders and family backgrounds, with a strong focus on supporting individuals from economically disadvantaged, marginalized, and vulnerable sectors. Children raised by single parents are also given priority. The selection process is guided by principles of fairness and merit, ensuring that no prejudice or bias affects the opportunity for deserving students to benefit from the program.",
    image: "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/37a4709192a12f7ebc9c3f899945e6b2.jpg"
  },
  {
    year: "Origins",
    title: "Origins and Early Support",
    content: "The program has grown from a mission to give more Filipino learners access to education and support. It reflects REX Education’s commitment to helping students achieve their goals through scholarship support, mentoring, and learning resources.",
    image: "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/727986cca63b39201d9f9947b6c0bdf5.jpg"
  },
  {
    year: "Expansion",
    title: "Expansion of Scholarship Categories",
    content: "As the program matured, it expanded to recognize a broader spectrum of student achievements. New scholarship categories were introduced to support academic excellence, athletic prowess, and artistic talent. These enhancements reflected REX Education’s commitment to nurturing diverse talents and promoting holistic learner development.",
    image: "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/ef53820a592a3b7677bc1bb371ca253b.jpg"
  }
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const HistoryPresentation = ({ onPresentationFinish }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const isLastSlide = page === historySlides.length - 1;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 overflow-hidden relative">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute w-full max-w-4xl px-4"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white shadow-2xl overflow-hidden rounded-2xl">
            <div className="grid md:grid-cols-2 min-h-[500px]">
              <div className="p-8 flex flex-col justify-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <p className="text-2xl font-bold text-primary">{historySlides[page].year}</p>
                  <h2 className="text-4xl font-extrabold mt-2 leading-tight">{historySlides[page].title}</h2>
                  <p className="mt-6 text-lg text-slate-300 leading-relaxed">{historySlides[page].content}</p>
                </motion.div>
              </div>
              <div className="relative hidden md:block">
                <img  
                    alt={historySlides[page].title} 
                    className="absolute inset-0 w-full h-full object-cover"
                    src={historySlides[page].image} />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900/50"></div>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={() => paginate(-1)}
          disabled={page === 0}
          className="bg-white/20 border-white/30 hover:bg-white/30 text-white rounded-full h-12 w-12"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        {isLastSlide ? (
            <Button onClick={onPresentationFinish} size="lg" className="rounded-full px-8 py-6 text-lg font-bold bg-primary hover:bg-primary/90">
                <PlayCircle className="mr-2 h-6 w-6" />
                Start Quiz
            </Button>
        ) : (
             <span className="text-white/50 text-sm w-28 text-center">Slide {page + 1} / {historySlides.length}</span>
        )}
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => paginate(1)}
          disabled={isLastSlide}
          className="bg-white/20 border-white/30 hover:bg-white/30 text-white rounded-full h-12 w-12"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {historySlides.map((_, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === page ? 'bg-primary scale-125' : 'bg-white/50'}`} />
            ))}
        </div>
    </div>
  );
};

export default HistoryPresentation;