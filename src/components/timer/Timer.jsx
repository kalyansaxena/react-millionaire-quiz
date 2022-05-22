import { useContext, useEffect, useState } from "react";

import { SelectedAnswerContext } from "../../context/selectedAnswerContext";
import { QuizCompletedStatusContext } from "../../context/quizCompletedContext";

import wait from "../../sounds/src_sounds_wait.mp3";
import { useSound } from "use-sound";

function Timer({ questionNumber }) {
  const [timer, setTimer] = useState(30);
  const [volume] = useState(0.5);
  const [waitSound, waitExposedData] = useSound(wait, { volume });
  const { sAnswer } = useContext(SelectedAnswerContext);
  const { dispatchCompletedStatus } = useContext(QuizCompletedStatusContext);

  useEffect(() => {
    if (timer === 20 && questionNumber === 1) {
      waitSound();
    } else if (timer === 0 && questionNumber === 1) {
      waitExposedData.stop();
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (sAnswer) {
      waitExposedData.stop();
      clearInterval(interval);
    }

    if (timer === 0) return dispatchCompletedStatus({ type: "completed" });

    return () => clearInterval(interval);
  }, [
    dispatchCompletedStatus,
    setTimer,
    timer,
    sAnswer,
    questionNumber,
    waitExposedData,
    waitSound,
  ]);

  useEffect(() => {
    setTimer(30);
  }, [setTimer, questionNumber]);

  return timer;
}

export default Timer;
