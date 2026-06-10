import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, BarChart3, Landmark, Briefcase, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import CourseQuiz from '@/components/Quiz/CourseQuiz';
import QuizNarrative from '@/components/Quiz/QuizNarrative';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

const courseData = [
  {
    title: "Academic Writing and Research Ethics",
    description: "Master the principles of ethical research and improve your academic writing skills.",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
  },
  {
    title: "Intro to Data Literacy (Excel and Google Sheets)",
    description: "Learn to analyze and visualize data effectively using essential spreadsheet tools.",
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
  },
  {
    title: "Financial Literacy",
    description: "Gain crucial knowledge on budgeting, saving, and managing your finances wisely.",
    icon: <Landmark className="w-8 h-8 text-primary" />,
  },
  {
    title: "Resume Building and Job Interview Prep",
    description: "Craft a standout resume and develop the confidence to ace your job interviews.",
    icon: <Briefcase className="w-8 h-8 text-primary" />,
  },
  {
    title: "Social Media Literacy and Digital Citizenship",
    description: "Navigate the digital world responsibly and build a positive online presence.",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const OnlineCourses = () => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [viewState, setViewState] = useState('list'); // 'list', 'narrative', 'quiz'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [completedQuizzes, setCompletedQuizzes] = useState(new Set());

  const fetchCompletedQuizzes = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('quiz_id')
      .eq('user_id', userId)
      .eq('passed', true);

    if (error) {
      console.error('Error fetching completed quizzes:', error);
    } else {
      const completedIds = new Set(data.map(item => item.quiz_id));
      setCompletedQuizzes(completedIds);
    }
  };

  useEffect(() => {
    fetchCompletedQuizzes();
  }, [userId]);

  const handleStartCourse = async (courseTitle) => {
    const { data, error } = await supabase
      .from('quizzes')
      .select('id')
      .eq('course_title', courseTitle)
      .single();

    if (error || !data) {
      toast({
        title: "Error",
        description: "Could not find the quiz for this course. Please try again later.",
        variant: "destructive",
      });
      console.error("Error fetching quiz id:", error);
    } else {
      setQuizId(data.id);
      setSelectedCourse(courseTitle);
      setViewState('narrative');
    }
  };

  const handleStartQuiz = () => {
    setViewState('quiz');
  };

  const handleFinish = () => {
    setSelectedCourse(null);
    setQuizId(null);
    setViewState('list');
    fetchCompletedQuizzes(); // Refresh completion status
  };

  if (viewState === 'narrative' && selectedCourse) {
    return <QuizNarrative courseTitle={selectedCourse} onStartQuiz={handleStartQuiz} onBack={handleFinish} />;
  }

  if (viewState === 'quiz' && selectedCourse && quizId) {
    return <CourseQuiz courseTitle={selectedCourse} quizId={quizId} onFinish={handleFinish} />;
  }

  return (
    <Card className="bg-background border-border">
      <CardHeader className="border-b border-border pb-4 px-6">
        <CardTitle className="text-primary">Online Courses</CardTitle>
        <CardDescription>Required online courses and training materials to enhance your skills.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {courseData.map((course, index) => {
            const isCompleted = completedQuizzes.has(
              // This is a bit of a hack, we need to know the quizId to check completion.
              // A better approach would be to fetch courses and their completion status together.
              // For now, we will rely on the button text changing after a quiz is completed and re-fetched.
              // A placeholder check:
              false 
            );

            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full flex flex-col bg-card border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div className="p-3 bg-primary/10 rounded-full">{course.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-card-foreground">{course.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button 
                      onClick={() => handleStartCourse(course.title)} 
                      className="w-full"
                      // disabled={isCompleted} // This will be enabled once we can reliably check completion status
                    >
                      {isCompleted ? <CheckCircle className="mr-2 h-4 w-4" /> : <BookOpen className="mr-2 h-4 w-4" />}
                      {isCompleted ? 'Course Completed' : 'Start Course'}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default OnlineCourses;