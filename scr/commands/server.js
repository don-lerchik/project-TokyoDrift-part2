const AbstractCommand = require(`./abstract-commands`);
const VARIABLES = require(`../untils/variable`);

const {LocalServer} = require(`../server/local-server`);

class Server extends AbstractCommand {
  execute() {
    const HOSTNAME = process.env.HOST || VARIABLES.SERVER_HOST;
    const PORT = parseInt(process.env.PORT, 10) || VARIABLES.SERVER_PORT;
    const localServer = new LocalServer(HOSTNAME, PORT);
    localServer.start();
  }
}

module.exports = new Server(`server`, `run local server`);
