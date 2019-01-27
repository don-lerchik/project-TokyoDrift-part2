const AbstractCommand = require(`./abstract-commands`);
const {description} = require(`../../package.json`);

class Description extends AbstractCommand {
  execute() {
    return console.log(description);
  }
}

module.exports = new Description(`description`, `Shows program description`);
