import { createContext, useReducer } from "react";
import SelectedAnswerReducer from "./selectedAnswerReducer";

const INITIAL_STATE = {
  sAnswer: null,
};

export const SelectedAnswerContext = createContext(INITIAL_STATE);

export const SelectedAnswerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SelectedAnswerReducer, INITIAL_STATE);

  return (
    <SelectedAnswerContext.Provider
      value={{ sAnswer: state.sAnswer, dispatch }}
    >
      {children}
    </SelectedAnswerContext.Provider>
  );
};
