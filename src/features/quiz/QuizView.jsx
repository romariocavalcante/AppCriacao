import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStats } from '@/context/UseStatsContext';
import { Button } from '@/components/ui/button';
import { Trophy, BookOpen } from 'lucide-react';

function QuizView() {
  const { quizQuestions, addPoints, completeMission } = useUserStats();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  const startQuiz = () => {
    setCurrentQuiz({
      questionIndex: 0,
      score: 0,
      answers: []
    });
    setQuizResults(null);
  };

  const answerQuestion = (answerIndex) => {
    const question = quizQuestions[currentQuiz.questionIndex];
    const isCorrect = answerIndex === question.correct;
    const newScore = currentQuiz.score + (isCorrect ? 1 : 0);
    
    const newAnswers = [...currentQuiz.answers, {
      questionId: question.id,
      answer: answerIndex,
      correct: isCorrect
    }];

    if (currentQuiz.questionIndex < quizQuestions.length - 1) {
      setCurrentQuiz({
        ...currentQuiz,
        questionIndex: currentQuiz.questionIndex + 1,
        score: newScore,
        answers: newAnswers
      });
    } else {
      const finalScore = Math.round((newScore / quizQuestions.length) * 100);
      setQuizResults({
        score: finalScore,
        correct: newScore,
        total: quizQuestions.length
      });
      
      addPoints(finalScore);
      completeMission(3); // Mission ID for completing daily quiz
      setCurrentQuiz(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 md:mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3 md:mb-4">Quiz Educativo</h2>
        <p className="text-sm md:text-base text-gray-600">Teste seus conhecimentos sobre prevenção da dengue!</p>
      </motion.div>

      {!currentQuiz && !quizResults && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="game-card text-center p-6 md:p-8"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Pronto para o desafio?</h3>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
            Responda {quizQuestions.length} perguntas sobre dengue e ganhe pontos!
          </p>
          <Button 
            onClick={startQuiz}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full md:w-auto"
          >
            Começar Quiz
          </Button>
        </motion.div>
      )}

      {currentQuiz && (
        <motion.div 
          key={currentQuiz.questionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="game-card p-4 md:p-6"
        >
          <div className="mb-4 md:mb-6">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <span className="text-xs md:text-sm text-gray-500">
                Pergunta {currentQuiz.questionIndex + 1} de {quizQuestions.length}
              </span>
              <span className="text-xs md:text-sm text-gray-500">
                Pontuação: {currentQuiz.score}/{currentQuiz.questionIndex + 1}
              </span>
            </div>
            <div className="bg-gray-200 rounded-full h-1.5 md:h-2 mb-3 md:mb-4">
              <div 
                className="progress-bar"
                style={{ width: `${((currentQuiz.questionIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 px-2">
            {quizQuestions[currentQuiz.questionIndex].question}
          </h3>

          <div className="space-y-2 md:space-y-3">
            {quizQuestions[currentQuiz.questionIndex].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start p-3 md:p-4 h-auto hover:bg-green-50 hover:border-green-300 text-sm md:text-base"
                onClick={() => answerQuestion(index)}
              >
                <span className="w-6 h-6 md:w-8 md:h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 text-xs md:text-sm font-semibold flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="break-words">{option}</span>
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      {quizResults && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="game-card text-center p-6 md:p-8"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Quiz Concluído!</h3>
          <p className="text-base md:text-lg mb-3 md:mb-4">
            Você acertou {quizResults.correct} de {quizResults.total} perguntas
          </p>
          <p className="text-2xl md:text-3xl font-bold gradient-text mb-4 md:mb-6">
            {quizResults.score} pontos!
          </p>
          <div className="space-y-3 md:space-y-4">
            <Button 
              onClick={() => {
                setQuizResults(null);
                startQuiz();
              }}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 w-full md:w-auto md:mr-4"
            >
              Jogar Novamente
            </Button>
            <Button 
              variant="outline"
              onClick={() => setQuizResults(null)}
              className="w-full md:w-auto"
            >
              Voltar
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default QuizView;