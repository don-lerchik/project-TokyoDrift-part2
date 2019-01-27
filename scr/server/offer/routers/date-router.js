const {NotFoundError, BadRequest} = require(`../../errors/errors`);
const logger = require(`../../../untils/winston-logger`);
const asyncMidleware = require(`../../../untils/async`);

module.exports = (router) => {

  router.get(`/:date`, asyncMidleware(async (req, res) => {

    const date = Number(req.params.date);
    if (!date) {
      throw new BadRequest(`Request doesn't contain the date`);
    }

    const offerToSend = await router.offersStore.getOffer(date);
    if (!offerToSend) {
      throw new NotFoundError(`Ad with date ${date} not found!`);
    }

    res.send(Object.assign({}, offerToSend, {_id: void 0}));
  }));

  router.get(`/:date/avatar`, asyncMidleware(async (req, res) => {

    const date = Number(req.params.date);
    if (!date) {
      throw new BadRequest(`Request doesn't contain the date`);
    }

    const offerToSend = await router.offersStore.getOffer(date);
    if (!offerToSend) {
      throw new NotFoundError(`Ad with date ${date} not found!`);
    }

    const avatar = offerToSend.author.avatar;
    if (!avatar) {
      throw new NotFoundError(`Ad with date ${date} didn't upload avatar`);
    }

    const {info, stream} = await router.avatarStore.get(avatar.path);
    if (!info) {
      throw new NotFoundError(`File was not found`);
    }

    res.header(`Content-Type`, avatar.mimetype);
    res.header(`Content-Length`, info.length);
    res.on(`error`, (err) => logger.error(err));
    res.on(`end`, () => res.end());

    stream.on(`error`, (err) => logger.error(err));
    stream.on(`end`, () => res.end());
    stream.pipe(res);
  }));

  router.get(`/:date/preview`, asyncMidleware(async (req, res) => {

    const date = Number(req.params.date);
    if (!date) {
      throw new BadRequest(`Request doesn't contain the date`);
    }

    const offerToSend = await router.offersStore.getOffer(date);
    if (!offerToSend) {
      throw new NotFoundError(`Ad with date ${date} not found!`);
    }

    const preview = offerToSend.offer.photos;
    if (preview.length === 0) {
      throw new NotFoundError(`Ad with date ${date} didn't upload photo`);
    }

    res.send(preview);
  }));

  router.get(`/:date/preview/:index`, asyncMidleware(async (req, res) => {
    const date = Number(req.params.date);
    const index = Number(req.params.index);

    if (!date) {
      throw new BadRequest(`Request doesn't contain the date`);
    }
    if (!index) {
      throw new BadRequest(`Request doesn't contain the index`);
    }
    const offerToSend = await router.offersStore.getOffer(date);

    if (!offerToSend) {
      throw new NotFoundError(`Ad with date ${date} not found!`);
    }

    const preview = offerToSend.offer.photos;
    const photo = preview[index - 1];

    if (preview.length === 0) {
      throw new NotFoundError(`Ad with date ${date} didn't upload photo`);
    }
    if (!photo) {
      throw new NotFoundError(`Ad with date ${date} didn't upload photo number ${index}, in this ad contain ${preview.length} photos`);
    }
    const {info, stream} = await router.previewStore.get(photo.path);
    if (!info) {
      throw new NotFoundError(`File was not found`);
    }

    res.header(`Content-Type`, photo.mimetype);
    res.header(`Content-Length`, info.length);
    res.on(`error`, (err) => logger.error(err));
    res.on(`end`, () => res.end());

    stream.on(`error`, (err) => logger.error(err));
    stream.on(`end`, () => res.end());
    stream.pipe(res);

  }));
};
