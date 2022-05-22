const QuizCompletedStatusReducer = (state, action) => {
  switch (action.type) {
    case "completed":
      return {
        stop: true,
      };

    default:
      return state;
  }
};

export default QuizCompletedStatusReducer;
