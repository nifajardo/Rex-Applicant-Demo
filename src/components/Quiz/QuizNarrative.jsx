import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { courseNarratives } from '@/constants/narratives';
import NarrativeAnimation from './NarrativeAnimation';
import GenericNarrativeAnimation from './GenericNarrativeAnimation';
import { supabase } from '@/lib/supabase';

const QuizNarrative = ({ courseTitle, onStartQuiz, onBack }) => {
  const narrative = courseNarratives[courseTitle] || {
    title: "Narrative Not Found",
    content: "The introduction for this course could not be loaded. You can still proceed to the quiz."
  };
  
  const isAcademicWritingCourse = courseTitle === "Academic Writing and Research Ethics";
  const videoFileName = narrative.videoUrl;
  let publicURL = null;

  if (videoFileName) {
      const { data } = supabase.storage.from('course_videos').getPublicUrl(videoFileName);
      publicURL = data.publicUrl;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="min-h-screen flex items-center justify-center bg-background p-4"
    >
      <Card className="w-full max-w-3xl shadow-2xl">
        <CardHeader className="text-center p-8 bg-primary/10">
          <CardTitle className="text-3xl font-bold text-primary">{courseTitle}</CardTitle>
          <CardDescription className="text-lg mt-2">{narrative.title}</CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {publicURL && (
            <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg border bg-black">
              <video
                src={publicURL}
                width="100%"
                height="100%"
                controls
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {isAcademicWritingCourse ? (
            <NarrativeAnimation />
          ) : (
            <GenericNarrativeAnimation narrative={narrative.content} />
          )}
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-muted/50">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
          <Button onClick={onStartQuiz}>
            Start Quiz
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuizNarrative;