const fs = require(`fs`);
const util = require(`util`);
const readFile = util.promisify(fs.readFile);
const logger = require(`../untils/winston-logger`);

const AbstractCommand = require(`./abstract-commands`);
const ValidatorAnswer = require(`../untils/validator`);
const offerStore = require(`../server/offer/store/offer-store`);
const ask = require(`../untils/ask`);
const VARIABLES = require(`../untils/variable`);


class Fill extends AbstractCommand {
  async execute() {
    await this.beginFill();
    const userPath = await this.getPathFill();
    await this.readAndFillTestDataFile(userPath);
    logger.info(`Database was successfully filled`);
    process.exit(VARIABLES.SUCCESS_EXIT_CODE);
  }
  async beginFill() {
    const userAnswer = await ask(`Do you want to fill database generate files? (y/n) \n`, ValidatorAnswer.getBoolAnswer);
    if (userAnswer === VARIABLES.NEGATIVE_ANSWER) {
      console.log(`So be it...\n By !`);
      process.exit(VARIABLES.SUCCESS_EXIT_CODE);
    }
  }
  async getPathFill() {
    const userAnswer = await ask(`Specify the path to the file, and the file name \nBy default, the file is in the current directory (${VARIABLES.PATH_TO_SAVE_TEST_DATA}) \nUse the default directory? (y/n) \n`, ValidatorAnswer.getBoolAnswer);
    if (userAnswer === VARIABLES.POSITIVE_ANSWER) {
      return VARIABLES.PATH_TO_SAVE_TEST_DATA;
    }
    const userPath = await ask(`Please enter directory and file name\n`, ValidatorAnswer.getCorrectPath);
    return userPath;
  }

  async readAndFillTestDataFile(filePath) {
    if (!fs.existsSync(filePath)) {
      console.log(`The specified directory (${filePath}) does not contain this file. \nPlease enter correct directory or generate test data enter commad node .--generate`);
      process.exit(VARIABLES.SUCCESS_EXIT_CODE);
    }
    const data = await readFile(filePath, {encoding: `utf8`}).catch((err) => logger.error(`ERROR READ FILES`, err));
    logger.info(`SUCCSEC READ FILE`);
    const dataToParse = JSON.parse(data);
    return await offerStore.saveMany(dataToParse).catch((err) => logger.error(`ERROR FILLS DATABASE`, err));
  }

}

module.exports = new Fill(`fill`, `Fill database generate test data for project`);
