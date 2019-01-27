const VARIABLES = require(`./variable`);

const ValidatorAnswer = {
  getBoolAnswer(answer) {
    return (answer === VARIABLES.POSITIVE_ANSWER) || (answer === VARIABLES.NEGATIVE_ANSWER);
  },

  getInteger(answer) {
    return (!isNaN(answer) && (Number.isInteger(+answer)) && (answer >= 0));
  },

  getInegerInInerval(answer, min = VARIABLES.MIN_VALUE_TEST_DATA, max = VARIABLES.MAX_VALUE_TEST_DATA) {
    return (!isNaN(answer) && (Number.isInteger(+answer)) && (answer >= 0)) && (answer >= min && answer <= max);
  },

  getCorrectPath(answer) {
    if (!answer) {
      return VARIABLES.PATH_TO_SAVE_TEST_DATA;
    }
    return VARIABLES.NO_USE_SYMBOL_TO_PATH.every((elem) => {
      return answer.indexOf(elem) < 0;
    });
  },
};

module.exports = ValidatorAnswer;
