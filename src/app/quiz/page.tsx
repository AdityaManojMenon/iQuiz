"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react";
import ResultCard from "./resultCard";
import QuizSubmission from "./quizSubmission"

const questions = [
  {
    questionText: "What is React?",
    answers: [
      { answerText: "A library for building user interface", isCorrect: true, id: 1 },
      { answerText: "A database", isCorrect: false, id: 2 },
      { answerText: "A language", isCorrect: false, id: 3 },
      { answerText: "A framework for building user interface", isCorrect: false, id: 4 },
    ],
  },
  {
    questionText: "What is JSX?",
    answers: [
      { answerText: "A syntax extension for JavaScript", isCorrect: true, id: 1 },
      { answerText: "A type of database", isCorrect: false, id: 2 },
      { answerText: "A CSS preprocessor", isCorrect: false, id: 3 },
      { answerText: "A JavaScript compiler", isCorrect: false, id: 4 },
    ],
  },
  {
    questionText: "Which method is used to update the state in a React component?",
    answers: [
      { answerText: "updateState()", isCorrect: false, id: 1 },
      { answerText: "setState()", isCorrect: true, id: 2 },
      { answerText: "modifyState()", isCorrect: false, id: 3 },
      { answerText: "changeState()", isCorrect: false, id: 4 },
    ],
  },
  {
    questionText: "What is the purpose of useEffect in React?",
    answers: [
      { answerText: "To handle side effects in function components", isCorrect: true, id: 1 },
      { answerText: "To fetch data from an API", isCorrect: false, id: 2 },
      { answerText: "To create a new state", isCorrect: false, id: 3 },
      { answerText: "To optimize the performance of components", isCorrect: false, id: 4 },
    ],
  },
];

export default function Home() {
    const [started, setStarted] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [submitted,setSubmitted] = useState<boolean>(false);
  
    const handleNext = () => {
      if (!started) {
        setStarted(true);
        return;
      }
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }else{
        setSubmitted(true);
        return;
      }
      setSelectedAnswer(null);
      setIsCorrect(null);
    };
  
    const handleAnswer = (answer) => {
      setSelectedAnswer(answer.id);
      const isCurrentCorrect = answer.isCorrect;
      if (isCurrentCorrect) {
        setScore(score + 1);
      }
      setIsCorrect(isCurrentCorrect);
    };

    const scorePercentage:number = Math.round((score/questions.length)*100)

    if(submitted){
        return(
            <QuizSubmission score={score} scorePercentage={scorePercentage} totalQuestions={questions.length}/>
        )
    }
  
    return (
      <div className="flex flex-col flex-1">
        <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
          <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
            <Button size="icon" variant="outline">
              <ChevronLeft />
            </Button>
            <ProgressBar value={(currentQuestion / questions.length) * 100} />
            <Button size="icon" variant="outline">
              <X />
            </Button>
          </header>
        </div>
        <main className="flex flex-1 justify-center flex-1">
          {!started ? (
            <h1 className="text-3xl font-bold flex justify-center">Welcome to iQuiz</h1>
          ) : (
            <div>
              <h2 className="text-3xl font-bold flex justify-center">
                {questions[currentQuestion].questionText}
              </h2>
              <div className="grid grid-cols-1 gap-6 mt-8">
                {questions[currentQuestion].answers.map((answer) => {
                  let variant = "neoOutline";
                  if (selectedAnswer === answer.id) {
                    variant = isCorrect ? "correct" : "wrong";
                  }
                  return (
                    <Button
                      key={answer.id}
                      variant={variant}
                      size="xl"
                      className="py-4 px-6 text-lg rounded-lg max-w-full break-words text-center"
                      onClick={() => handleAnswer(answer)}
                      disabled={selectedAnswer !== null} // Disable buttons after selection
                    >
                      {answer.answerText}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </main>
        <footer className="footer pb-9 px-6">
          {started && (
            <ResultCard
              isCorrect={isCorrect}
              correctAnswer={questions[currentQuestion].answers.find(
                (answer) => answer.isCorrect
              )?.answerText}
            />
          )}
          <Button variant="neo" size="lg" onClick={handleNext}>
            {!started ? "Start" : (currentQuestion=== questions.length - 1) ? "Submit":"Next"}
          </Button>
        </footer>
      </div>
    );
  }