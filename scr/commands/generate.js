const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);
const logger = require(`../untils/winston-logger`);

const AbstractCommand = require(`./abstract-commands`);
const ValidatorAnswer = require(`../untils/validator`);
const ask = require(`../untils/ask`);
const offerGenerate = require(`../../test/generator/offer-generator`);
const VARIABLES = require(`../untils/variable`);


class Generate extends AbstractCommand {
  async execute() {
    await this.beginGenerate();
    const count = await this.getCountGenerate();
    const userPath = await this.getPathGenerate();
    const testDataFile = await this.generateData(count);
    await this.writeTestDataFile(userPath, testDataFile);
    logger.info(`Done ! The data were saved. Path: ${userPath}`);
    process.exit(VARIABLES.SUCCESS_EXIT_CODE);
  }

  async beginGenerate() {
    const userAnswer = await ask(`Do you want to generate data? (y/n) \n`, ValidatorAnswer.getBoolAnswer);
    if (userAnswer === VARIABLES.NEGATIVE_ANSWER) {
      console.log(`So be it...\n By !`);
      process.exit(VARIABLES.SUCCESS_EXIT_CODE);
    }
  }

  async getCountGenerate() {
    const userAnswer = await ask(`How many entities should be generated? (number)\nPlease enter number Min : ${VARIABLES.MIN_VALUE_TEST_DATA} Max : ${VARIABLES.MAX_VALUE_TEST_DATA}\n`, ValidatorAnswer.getInegerInInerval);
    return userAnswer;
  }

  async getPathGenerate() {
    const userAnswer = await ask(`Specify the path to the file, and the file name \nBy default, the file will be created in the current directory (${VARIABLES.PATH_TO_SAVE_TEST_DATA}) \nUse the default directory? (y/n) \n`, ValidatorAnswer.getBoolAnswer);
    if (userAnswer === VARIABLES.POSITIVE_ANSWER) {
      return VARIABLES.PATH_TO_SAVE_TEST_DATA;
    }
    const userPath = await ask(`Please enter directory\n`, ValidatorAnswer.getCorrectPath);
    return userPath;
  }

  async writeTestDataFile(filePath, data) {
    if (fs.existsSync(filePath)) {
      const userAnswer = await ask(`File already exists. Do you want to rewrite it? (y/n)\n`, ValidatorAnswer.getBoolAnswer);
      if (userAnswer === VARIABLES.NEGATIVE_ANSWER) {
        console.log(`So be it...\n By !`);
        process.exit(VARIABLES.SUCCESS_EXIT_CODE);
      }
    }
    return await writeFile(filePath, JSON.stringify(data), VARIABLES.FILE_WRITE_OPTION).catch((err) => {
      logger.error(`Error in creating test data`, err);
      process.exit(VARIABLES.FAILURE_EXIT_CODE);
    });
  }

  generateData(count) {
    const arrayTestData = [];
    for (let i = 0; i < count; i++) {
      arrayTestData.push(offerGenerate());
    }
    return arrayTestData;
  }
}

module.exports = new Generate(`generate`, `Generates data for project`);
