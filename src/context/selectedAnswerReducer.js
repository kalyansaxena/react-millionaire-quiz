const SelectedAnswerReducer = (state, action) => {
  switch (action.type) {
    case "selected":
      return {
        sAnswer: action.answer,
      };

    case "clearAnswer":
      return {
        sAnswer: null,
      };

    default:
      return state;
  }
};

export default SelectedAnswerReducer;
