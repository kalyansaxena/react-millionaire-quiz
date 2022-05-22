import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SelectedAnswerContextProvider } from "./context/selectedAnswerContext";
import { QuizCompletedContextProvider } from "./context/quizCompletedContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SelectedAnswerContextProvider>
      <QuizCompletedContextProvider>
        <App />
      </QuizCompletedContextProvider>
    </SelectedAnswerContextProvider>
  </React.StrictMode>
);
