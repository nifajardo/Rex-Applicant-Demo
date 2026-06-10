import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { quizQuestions } from './QuizQuestions';
import { CheckCircle, XCircle, RotateCcw, Loader2 } from 'lucide-react';
import { updateProfile } from '@/lib/supabase';

const Quiz = ({ onQuizPassed, userId }) => {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answerStatus, setAnswerStatus] = useState({});
  const [score, setScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passingScore = 3;

  useEffect(() => {
    setSelectedAnswers({});
    setAnswerStatus({});
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizSubmitted(false);
    setIsSubmitting(false);
  }, [userId]);

  const handleAnswerSelection = (questionIndex, answer) => {
    if (answerStatus[questionIndex]) return;

    const isCorrect = quizQuestions[questionIndex].correctAnswer === answer;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));

    setAnswerStatus(prev => ({
      ...prev,
      [questionIndex]: isCorrect ? 'correct' : 'incorrect'
    }));

    if (isCorrect) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct!",
        description: "Great job!",
        className: "bg-red-700 text-white",
        duration: 2000,
      });
    } else {
      toast({
        title: "Incorrect",
        description: "The correct answer has been highlighted.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswers[currentQuestionIndex] === undefined) {
      toast({
        title: "No Answer Selected",
        description: "Please select an answer before proceeding.",
        variant: "destructive"
      });
      return;
    }
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (selectedAnswers[currentQuestionIndex] === undefined && Object.keys(selectedAnswers).length < quizQuestions.length) {
        toast({
          title: "Incomplete Quiz",
          description: "Please answer the current question before submitting.",
          variant: "destructive"
        });
        return;
    }
    
    setIsSubmitting(true);
    
    const passed = score >= passingScore;
    setQuizSubmitted(true);

    if (passed) {
      try {
        const { error } = await updateProfile(userId, { quiz_completed: true });
        if (error) throw error;
        
        toast({
          title: "Quiz Passed!",
          description: `Congratulations! Score: ${score}/${quizQuestions.length}. Loading dashboard...`,
          className: "bg-red-700 text-white",
          duration: 2000,
        });

        setTimeout(() => {
            onQuizPassed();
        }, 2000);

      } catch (error) {
        console.error("Error updating quiz status:", error);
        toast({
          title: "Error Saving Quiz Status",
          description: "Could not save quiz result. You may proceed. Contact support if issue persists.",
          variant: "destructive",
          duration: 7000
        });
        onQuizPassed(); // Allow user to proceed even if DB update fails
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast({
        title: "Quiz Failed",
        description: `Your score: ${score}/${quizQuestions.length}. You need ${passingScore} to pass. Please try again.`,
        variant: "destructive",
        duration: 5000,
      });
      setIsSubmitting(false);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setAnswerStatus({});
    setScore(0);
    setQuizSubmitted(false);
    setIsSubmitting(false);
  };

  if (quizSubmitted) {
    const passed = score >= passingScore;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-4"
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
            <p className="text-xl">Your score: <span className={`font-bold ${passed ? 'text-red-700' : 'text-red-600'}`}>{score}</span> / {quizQuestions.length}</p>
            {passed ? (
              <p className="text-red-700">Congratulations! You passed the quiz.</p>
            ) : (
              <p className="text-red-600">Unfortunately, you did not pass. You need at least {passingScore} correct answers.</p>
            )}
          </CardContent>
          <CardFooter>
            {!passed ? (
              <Button onClick={handleRetakeQuiz} className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RotateCcw className="mr-2 h-4 w-4" />}
                 Retake Quiz
              </Button>
            ) : (
                 <p className="text-sm text-center w-full">Redirecting to dashboard...</p>
             )}
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  const currentQ = quizQuestions[currentQuestionIndex];
  const currentAnswerStatus = answerStatus[currentQuestionIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-500 via-indigo-600 to-purple-700 p-4"
    >
      <Card className="w-full max-w-2xl shadow-xl overflow-hidden">
        <CardHeader className="bg-primary/10 p-6">
          <CardTitle className="text-2xl font-semibold text-primary text-center">REX Education Scholarship Program Quiz</CardTitle>
          <CardDescription className="text-center mt-1">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <p className="text-lg font-medium text-gray-800">{currentQ.question}</p>
          <RadioGroup
            value={selectedAnswers[currentQuestionIndex]}
            onValueChange={(value) => handleAnswerSelection(currentQuestionIndex, value)}
            className="space-y-3"
            disabled={!!currentAnswerStatus}
          >
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === option;
              const isCorrect = currentQ.correctAnswer === option;
              let optionClass = "border-gray-200 hover:bg-muted/50";
              if (currentAnswerStatus) {
                if (isCorrect) {
                  optionClass = "border-red-700 bg-red-100/50";
                } else if (isSelected && currentAnswerStatus === 'incorrect') {
                  optionClass = "border-red-500 bg-red-100/50";
                }
              }

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors ${optionClass}`}
                >
                  <RadioGroupItem value={option} id={`q${currentQuestionIndex}-opt${idx}`} disabled={!!currentAnswerStatus} />
                  <Label htmlFor={`q${currentQuestionIndex}-opt${idx}`} className={`text-base flex-1 ${!!currentAnswerStatus ? 'cursor-default' : 'cursor-pointer'}`}>
                    {option}
                  </Label>
                  {currentAnswerStatus && isCorrect && <CheckCircle className="h-5 w-5 text-red-700" />}
                  {currentAnswerStatus === 'incorrect' && isSelected && <XCircle className="h-5 w-5 text-red-600" />}
                </motion.div>
              );
            })}
          </RadioGroup>
        </CardContent>
        <CardFooter className="bg-gray-50 p-6 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Score {passingScore} out of {quizQuestions.length} to pass.
          </div>
          <div>
            {currentQuestionIndex < quizQuestions.length - 1 ? (
              <Button onClick={handleNextQuestion} disabled={isSubmitting || !currentAnswerStatus}>Next Question</Button>
            ) : (
              <Button onClick={handleSubmitQuiz} disabled={isSubmitting || !currentAnswerStatus} className="bg-red-800 hover:bg-red-900">
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

export default Quiz;
