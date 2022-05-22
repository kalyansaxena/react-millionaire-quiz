import { useEffect, useState, useContext } from "react";
import "./App.scss";

import { moneyPyramid } from "./moneyPyramidData";
import { QAdata } from "./quizQA";

import Timer from "./components/timer/Timer";
import Trivia from "./components/trivia/Trivia";

import { QuizCompletedStatusContext } from "./context/quizCompletedContext";
import { SelectedAnswerContext } from "./context/selectedAnswerContext";

import wait from "./sounds/src_sounds_wait.mp3";
import { useSound } from "use-sound";

function App() {
  const data = QAdata;
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earnedMoney, setEarnedMoney] = useState("0");
  const { sAnswer } = useContext(SelectedAnswerContext);
  const [volume] = useState(0.5);
  const [waitSound, exposedData] = useSound(wait, { volume });
  const { stop } = useContext(QuizCompletedStatusContext);

  useEffect(() => {
    questionNumber > 1 &&
      setEarnedMoney(
        moneyPyramid.find((m) => m.id === questionNumber - 1).amount
      );
  }, [questionNumber]);

  useEffect(() => {
    if ((questionNumber > 1 && stop) || (questionNumber > 1 && sAnswer)) {
      exposedData.stop();
    }
  }, [questionNumber, exposedData, stop, sAnswer]);

  useEffect(() => {
    if (questionNumber > 1) {
      waitSound();
    }
  }, [questionNumber, waitSound]);

  const playAgain = () => {
    window.location = "https://kalyansaxena.github.io/react-millionaire-quiz/";
  };

  return (
    <div className="App">
      <div className={stop ? "main w100OnStop" : "main"}>
        {stop ? (
          <h1 className="result">
            <div className="r-info">
              {questionNumber > 10 ? "Well played," : ""} You've earned: &#8377;{" "}
              {earnedMoney}
            </div>
            <div className="playAgain" onClick={playAgain}>
              Play Again
            </div>
          </h1>
        ) : (
          <>
            <div className="top">
              <div className="info">
                Click anywhere on the screen if the background music doesn't
                start by itself, this project was created with the intention of
                learning purpose and not to earn
              </div>
              <div className="timer">
                <Timer questionNumber={questionNumber} />
              </div>
            </div>
            <div className="bottom">
              <Trivia
                data={data}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
              />
            </div>
          </>
        )}
      </div>
      {stop ? (
        <></>
      ) : (
        <>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                  key={m.id}
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">
                    &#8377; {m.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
