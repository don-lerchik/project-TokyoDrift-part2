const AbstractCommand = require(`./abstract-commands`);
const {author} = require(`../../package.json`);

class Author extends AbstractCommand {
  execute() {
    return console.log(author);
  }
}

module.exports = new Author(`author`, `Shows program author`);
