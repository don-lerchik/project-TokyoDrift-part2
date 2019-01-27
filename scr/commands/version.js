const AbstractCommand = require(`./abstract-commands`);
const {version} = require(`../../package.json`);

class Version extends AbstractCommand {
  execute() {
    return console.log(`v${version}`);
  }
}

module.exports = new Version(`version`, `Shows program version`);
