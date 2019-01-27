const express = require(`express`);
const path = require(`path`);

const logger = require(`../untils/winston-logger`);
/* const VARIABLES = require(`../untils/variable`); */
const ImageStore = require(`./offer/store/image-store`);
const offerStore = require(`./offer/store/offer-store`);
const avatarStore = new ImageStore(`avatar`);
const previewStore = new ImageStore(`preview`);
const offerRoute = require(`./offer/routers/route`)(offerStore, avatarStore, previewStore);

const STATIC_DIR = path.join(process.cwd(), `static`);

/* const NOT_FOUND_HANDLER = (req, res) => {
  res.status(VARIABLES.STATUS_CODE.NOT_FOUND).send(`Page was not found`);
};
const generateStringError = (err) => `${err.code} ${err.name} ${err.message}`;
const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    logger.error(err.message);
    res.status(err.code || VARIABLES.STATUS_CODE.INTERNAL_SERVER_ERROR).send(generateStringError(err));
  }
}; */

class LocalServer {
  constructor(host, port) {
    this.port = port;
    this.host = host;
    this.app = express();
  }

  start() {
    this.init();
    this.app.listen(this.port, (err) => {
      if (err) {
        logger.error(`тут ошибка`, err);
        return;
      }
      console.log(`Local server is running at http://${this.host}:${this.port}`);
    });
  }

  init() {
    this.app.use(express.static(STATIC_DIR));
    this.app.use(`/api/offers`, offerRoute);
    /*  this.app.use(NOT_FOUND_HANDLER);
    this.app.use(ERROR_HANDLER); */
  }
}

module.exports = {
  LocalServer
};
