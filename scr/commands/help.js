const AbsctractCommand = require(`./abstract-commands`);
const version = require(`./version`);
const license = require(`./license`);
const author = require(`./author`);
const description = require(`./description`);
const generate = require(`./generate`);
const server = require(`./server`);
const fill = require(`./fill-db`);

class Help extends AbsctractCommand {
  constructor(name, descrp, commands) {
    super(name, descrp);
    this.commands = commands;
  }
  execute() {
    return console.log(this.helpOutput());
  }

  helpOutput() {
    const commandsList = this.commands.map((command) => `--${command.name} - ${command.description}`).join(`\n`);
    return `Available commands\n--help - Shows available commands\n${commandsList}`;
  }
}

module.exports = new Help(`help`, `Shows available commands`, [version, license, author, description, generate, fill, server]);
