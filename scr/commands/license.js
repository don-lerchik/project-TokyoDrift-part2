const AbstractCommand = require(`./abstract-commands`);
const {license} = require(`../../package.json`);

class License extends AbstractCommand {
  execute() {
    return console.log(license);
  }
}

module.exports = new License(`license`, `Shows program license`);
