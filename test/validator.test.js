/* const assert = require(`assert`);
const ValidatorAnswer = require(`../scr/untils/validator`);
const VARIABLES = require(`../scr/untils/variable`);
const Randomize = require(`../scr/untils/randomize`);

describe(`Test validation users answers`, () => {
  describe(`validation bool answer`, () => {
    it(`correct answer`, () => {
      assert.equal(ValidatorAnswer.getBoolAnswer(VARIABLES.POSITIVE_ANSWER), true);
      assert.equal(ValidatorAnswer.getBoolAnswer(VARIABLES.NEGATIVE_ANSWER), true);
    });
    it(`not correct answer`, () => {
      const userAnswerNumber = 12345;
      const userAnswerString = `not correct`;
      assert.equal(ValidatorAnswer.getBoolAnswer(userAnswerNumber), false);
      assert.equal(ValidatorAnswer.getBoolAnswer(userAnswerString), false);
    });
  });

  describe(`validation integer answer , between ${VARIABLES.MIN_VALUE_TEST_DATA} and ${VARIABLES.MAX_VALUE_TEST_DATA}`, () => {
    it(`correct answer`, () => {
      assert.equal(ValidatorAnswer.getInegerInInerval(VARIABLES.MIN_VALUE_TEST_DATA), true);
      assert.equal(ValidatorAnswer.getInegerInInerval(VARIABLES.MAX_VALUE_TEST_DATA), true);
      const interval = Math.floor((VARIABLES.MAX_VALUE_TEST_DATA - VARIABLES.MIN_VALUE_TEST_DATA) / 2);
      assert.equal(ValidatorAnswer.getInegerInInerval(interval), true);
    });
    it(`not correct answer`, () => {
      const min = VARIABLES.MIN_VALUE_TEST_DATA - 1;
      const max = VARIABLES.MAX_VALUE_TEST_DATA + 1;
      const notInteger = (VARIABLES.MAX_VALUE_TEST_DATA - VARIABLES.MIN_VALUE_TEST_DATA) * 0.5555;
      const notNumber = `not number`;
      assert.equal(ValidatorAnswer.getInegerInInerval(min), false);
      assert.equal(ValidatorAnswer.getInegerInInerval(max), false);
      assert.equal(ValidatorAnswer.getInegerInInerval(notInteger), false);
      assert.equal(ValidatorAnswer.getInegerInInerval(notNumber), false);
    });
  });

  describe(`validation correct path file , by default path : ${VARIABLES.PATH_TO_SAVE_TEST_DATA}`, () => {
    it(`correct answer`, () => {
      assert.equal(ValidatorAnswer.getCorrectPath(), VARIABLES.PATH_TO_SAVE_TEST_DATA);
      const correctPath = `data/test-data/correct-data.json`;
      assert.equal(ValidatorAnswer.getCorrectPath(correctPath), true);
    });
    it(`not correct answer`, () => {
      const randomNotUseSymbol = Randomize.getArrayElem(VARIABLES.NO_USE_SYMBOL_TO_PATH);
      const notCorrectPath = `data/test-data/correct-data` + randomNotUseSymbol;
      assert.equal(ValidatorAnswer.getCorrectPath(notCorrectPath), false);
    });
  });
});
 */
