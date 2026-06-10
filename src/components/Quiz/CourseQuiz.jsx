import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, XCircle, RotateCcw, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

const CourseQuiz = ({ courseTitle, quizId, onFinish }) => {
  const { toast } = useToast();
  const { userId } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passingScorePercentage = 0.8; // 80% to pass

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('id, question_text')
        .eq('quiz_id', quizId);

      if (questionsError) {
        toast({ title: "Error fetching questions", variant: "destructive" });
        console.error(questionsError);
        setIsLoading(false);
        return;
      }

      const questionsWithOptions = await Promise.all(
        questionsData.map(async (q) => {
          const { data: optionsData, error: optionsError } = await supabase
            .from('options')
            .select('id, option_text, is_correct')
            .eq('question_id', q.id);
          
          if (optionsError) {
            console.error("Error fetching options for question:", q.id, optionsError);
            return { ...q, options: [] };
          }
          return { ...q, options: optionsData };
        })
      );

      setQuestions(questionsWithOptions);
      setIsLoading(false);
    };

    if (quizId) {
      fetchQuestions();
    }
  }, [quizId, toast]);

  const handleAnswerSelection = (questionId, optionId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswers[currentQuestion.id] === undefined) {
      toast({
        title: "No Answer Selected",
        description: "Please select an answer before proceeding.",
        variant: "destructive"
      });
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmitQuiz = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswers[currentQuestion.id] === undefined && Object.keys(selectedAnswers).length < questions.length) {
        toast({
          title: "Incomplete Quiz",
          description: "Please answer the current question before submitting.",
          variant: "destructive"
        });
        return;
    }
    
    setIsSubmitting(true);
    let currentScore = 0;
    questions.forEach(q => {
      const selectedOptionId = selectedAnswers[q.id];
      const correctOption = q.options.find(opt => opt.is_correct);
      if (correctOption && selectedOptionId === correctOption.id) {
        currentScore++;
      }
    });
    setScore(currentScore);
    
    const passed = currentScore / questions.length >= passingScorePercentage;

    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .upsert({
            user_id: userId,
            quiz_id: quizId,
            score: currentScore,
            passed: passed,
        }, { onConflict: 'user_id, quiz_id' });

      if (error) throw error;

      toast({
        title: passed ? "Quiz Passed!" : "Quiz Failed",
        description: `Your score: ${currentScore}/${questions.length}.`,
        variant: passed ? "default" : "destructive",
        className: passed ? "bg-red-700 text-white" : "",
      });
    } catch (error) {
      console.error("Error saving quiz attempt:", error);
      toast({
        title: "Error Saving Result",
        description: "Could not save your quiz result. Please try again.",
        variant: "destructive",
      });
    } finally {
      setQuizSubmitted(true);
      setIsSubmitting(false);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setQuizSubmitted(false);
    setIsSubmitting(false);
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading quiz..." />;
  }

  if (questions.length === 0) {
    return (
        <div className="text-center p-8">
            <p>No questions found for this quiz.</p>
            <Button onClick={onFinish} className="mt-4"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses</Button>
        </div>
    );
  }

  if (quizSubmitted) {
    const passed = score / questions.length >= passingScorePercentage;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-background p-4"
      >
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Quiz Results</CardTitle>
            {passed ? (
              <CheckCircle className="mx-auto h-16 w-16 text-red-700 mt-4" />
            ) : (
              <XCircle className="mx-auto h-16 w-16 text-red-500 mt-4" />
            )}
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-xl">Your score: <span className={`font-bold ${passed ? 'text-red-700' : 'text-red-600'}`}>{score}</span> / {questions.length}</p>
            {passed ? (
              <p className="text-red-700">Congratulations! You passed the quiz.</p>
            ) : (
              <p className="text-red-600">Unfortunately, you did not pass. You need at least {Math.ceil(questions.length * passingScorePercentage)} correct answers.</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            {!passed && (
              <Button onClick={handleRetakeQuiz} className="w-full" disabled={isSubmitting}>
                <RotateCcw className="mr-2 h-4 w-4" /> Retake Quiz
              </Button>
            )}
            <Button onClick={onFinish} className="w-full" variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center bg-background p-4"
    >
      <Card className="w-full max-w-2xl shadow-xl overflow-hidden">
        <CardHeader className="bg-primary/10 p-6">
          <CardTitle className="text-2xl font-semibold text-primary text-center">{courseTitle}</CardTitle>
          <CardDescription className="text-center mt-1">
            Question {currentQuestionIndex + 1} of {questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <p className="text-lg font-medium text-card-foreground">{currentQ.question_text}</p>
          <RadioGroup
            value={selectedAnswers[currentQ.id]}
            onValueChange={(value) => handleAnswerSelection(currentQ.id, value)}
            className="space-y-3"
          >
            {currentQ.options.map((option, idx) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="text-base cursor-pointer flex-1">
                  {option.option_text}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="bg-muted/50 p-6 flex justify-between items-center">
            <Button onClick={onFinish} variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
          <div>
            {currentQuestionIndex < questions.length - 1 ? (
              <Button onClick={handleNextQuestion} disabled={isSubmitting}>Next Question</Button>
            ) : (
              <Button onClick={handleSubmitQuiz} disabled={isSubmitting} className="bg-red-800 hover:bg-red-900">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CourseQuiz;
