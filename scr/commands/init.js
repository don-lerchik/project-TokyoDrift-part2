const version = require(`./version`);
const help = require(`./help`);
const license = require(`./license`);
const author = require(`./author`);
const description = require(`./description`);
const generate = require(`./generate`);
const fill = require(`./fill-db`);
const server = require(`./server`);
const VARIABLES = require(`../untils/variable`);
const logger = require(`../untils/winston-logger`);

const COMMAND_ID = {
  '--author': author,
  '--version': version,
  '--license': license,
  '--description': description,
  '--help': help,
  '--generate': generate,
  '--fill': fill,
  '--server': server
};

class Initilization {
  constructor(inputCommand, title = `unknow`) {
    this.inputCommand = inputCommand;
    this.title = title;
  }

  greetingMessage() {
    return console.log(`Hi user!\nThis program will start the server «${this.title}».`);
  }

  errorMessage() {
    return logger.info(`Unknown command ${this.inputCommand}`);
  }

  async init() {
    if (!this.inputCommand) {
      this.greetingMessage();
      process.exit(VARIABLES.SUCCESS_EXIT_CODE);
    }
    if (COMMAND_ID[this.inputCommand] === COMMAND_ID[`--server`]) {
      return COMMAND_ID[this.inputCommand].execute();
    }
    if (COMMAND_ID[this.inputCommand]) {
      await COMMAND_ID[this.inputCommand].execute();
      process.exit(VARIABLES.SUCCESS_EXIT_CODE);
    }
    this.errorMessage();
    COMMAND_ID[`--help`].execute();
    return process.exit(VARIABLES.FAILURE_EXIT_CODE);
  }
}

const command = process.argv.slice(2);

const initilization = new Initilization(command, `KEKSOBUKING`);
initilization.init();

