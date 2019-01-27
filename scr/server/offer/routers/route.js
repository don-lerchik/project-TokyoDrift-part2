const {Router} = require(`express`);

const setDefaultRoute = require(`./default-router`);
const setDateRoute = require(`./date-router`);
const enableCors = require(`./enable-cors`);
const dataRenderer = require(`./data-renderer`);
const offersRouter = new Router();

setDefaultRoute(offersRouter);
setDateRoute(offersRouter);
enableCors(offersRouter);

offersRouter.use((exception, req, res, next) => {
  dataRenderer.renderException(req, res, exception);
  next();
});

module.exports = (offersStore, avatarStore, previewStore) => {
  offersRouter.offersStore = offersStore;
  offersRouter.avatarStore = avatarStore;
  offersRouter.previewStore = previewStore;
  return offersRouter;
};
