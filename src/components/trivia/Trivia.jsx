import { useContext, useEffect, useState } from "react";
import "./trivia.scss";

import { useSound } from "use-sound";
import play from "../../sounds/src_sounds_play.mp3";
import correct from "../../sounds/src_sounds_correct.mp3";
import wrong from "../../sounds/src_sounds_wrong.mp3";

import { SelectedAnswerContext } from "../../context/selectedAnswerContext";
import { QuizCompletedStatusContext } from "../../context/quizCompletedContext";

function Trivia({ data, questionNumber, setQuestionNumber }) {
  const [question, setQuestion] = useState(null);
  const [cName, setClassName] = useState("answer");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { dispatch } = useContext(SelectedAnswerContext);
  const { dispatchCompletedStatus } = useContext(QuizCompletedStatusContext);
  const [volume] = useState(0.5);
  const [letsPlay] = useSound(play, { volume });
  const [correctAnswer] = useSound(correct, { volume });
  const [wrongAnswer] = useSound(wrong, { volume });

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    dispatch({ type: "selected", answer: a });
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });

    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          if (questionNumber === 15) {
            dispatchCompletedStatus({ type: "completed" });
          }
          setQuestionNumber((prev) => prev + 1);
          dispatch({ type: "clearAnswer" });
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          dispatchCompletedStatus({ type: "completed" });
        });
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            className={selectedAnswer === a ? cName : "answer"}
            onClick={() => !selectedAnswer && handleClick(a)}
            key={a.text}
          >
            <span>{a.option}</span>
            <span>{a.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trivia;
