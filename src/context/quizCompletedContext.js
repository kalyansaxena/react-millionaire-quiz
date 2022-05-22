import { createContext, useReducer } from "react";
import QuizCompletedStatusReducer from "./quizCompletedStatusReducer";

const INITIAL_STATE = {
  stop: false,
};

export const QuizCompletedStatusContext = createContext(INITIAL_STATE);

export const QuizCompletedContextProvider = ({ children }) => {
  const [state, dispatchCompletedStatus] = useReducer(
    QuizCompletedStatusReducer,
    INITIAL_STATE
  );

  return (
    <QuizCompletedStatusContext.Provider
      value={{ stop: state.stop, dispatchCompletedStatus }}
    >
      {children}
    </QuizCompletedStatusContext.Provider>
  );
};
