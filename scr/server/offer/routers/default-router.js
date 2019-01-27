const multer = require(`multer`);
const express = require(`express`);
const toStream = require(`buffer-to-stream`);

const {BadRequest, ValidationError} = require(`../../errors/errors`);
const asyncMidleware = require(`../../../untils/async`);
const VARIABLES = require(`../../../untils/variable`);
const OfferContent = require(`../../../untils/offer-content`);
const validator = require(`../../../untils/validator`);
const Randomize = require(`../../../untils/randomize`);
const {validateOffers, offersValidateShema, isImageMimeType} = require(`./validate-offers`);
const dataRenderer = require(`./data-renderer`);

const jsonParser = express.json();
const upload = multer({storage: multer.memoryStorage()}).fields([
  {name: `avatar`, maxCount: 1},
  {name: `preview`, maxCount: 10}
]);

const setAvatarUrl = (offerDate) => `/api/offers/${offerDate}/avatar`;
const setPreviewUrl = (offerDate, index) => `/api/offers/${offerDate}/preview/${index}`;


const toPage = async (cursor, skip, limit) => {
  const countOffers = await cursor.count();
  if (skip > countOffers) {
    throw new BadRequest(`Invalid skip value -- ${skip} - is biggest then count offers in database -- ${countOffers}`);
  }
  return {
    data: await (cursor.skip(skip).limit(limit).toArray()),
    skip,
    limit,
    total: countOffers
  };
};

const prepareForSaving = (receivedOffer) => {
  const [coordinateX, coordinateY] = receivedOffer.coordinate.split(`,`).map((it) => {
    return it.trim();
  });
  const date = Math.floor(Date.now());

  const offerToSave = {
    author: {
      name: receivedOffer.name,
    },
    offer: {
      title: receivedOffer.title,
      type: receivedOffer.type,
      price: receivedOffer.price,
      guests: receivedOffer.guests,
      checkin: receivedOffer.checkin,
      checkout: receivedOffer.checkout,
      rooms: receivedOffer.rooms,
      adress: receivedOffer.adress,
      features: receivedOffer.features,
      description: receivedOffer.description,
      photos: [],
    },
    location: {
      x: Number(coordinateX),
      y: Number(coordinateY)
    },
    date
  };
  return offerToSave;
};


module.exports = (router) => {

  router.get(``, asyncMidleware(async (req, res) => {
    const {skip = VARIABLES.OFFERS_DATA_SKIP, limit = VARIABLES.OFFERS_DATA_LIMIT} = req.query;
    const limitNumber = Number(limit);
    const skipNumber = Number(skip);
    if (!validator.getInteger(skipNumber)) {
      throw new BadRequest(`Invalid skip value -- ${skip} - is not number`);
    }
    if (!(validator.getInteger(limitNumber))) {
      throw new BadRequest(`Invalid limit value -- ${limit} - is not number`);
    }
    const offersToSend = await toPage(await router.offersStore.getAllOffers(), skipNumber, limitNumber);
    res.send(offersToSend);
  }));

  router.post(``, jsonParser, upload, asyncMidleware(async (req, res) => {
    const files = req.files;
    const body = req.body;
    let avatar;
    let preview;

    if (!body.name) {
      body.name = Randomize.getArrayElem(OfferContent.names);
    }

    if (files) {
      avatar = files[`avatar`] ? files[`avatar`] : void 0;
      preview = files[`preview`] ? files[`preview`] : void 0;
    }

    const errorData = validateOffers(body, offersValidateShema);
    if (errorData.length > 0) {
      throw new ValidationError(errorData);
    }

    const offerToSave = prepareForSaving(body);

    if (avatar) {
      const errorsFile = isImageMimeType(avatar);
      if (errorsFile.length > 0) {
        throw new ValidationError(errorsFile);
      }
      const avatarPath = setAvatarUrl(offerToSave.date);
      await router.avatarStore.save(avatarPath, toStream(avatar[0].buffer));
      offerToSave.author.avatar = {path: avatarPath, mimetype: avatar[0].mimetype};
    }

    if (preview) {
      const errorsFile = isImageMimeType(preview);
      if (errorsFile.length > 0) {
        throw new ValidationError(errorsFile);
      }
      let index = 1;
      for (const it of preview) {
        const previewPath = setPreviewUrl(offerToSave.date, index);
        await router.previewStore.save(previewPath, toStream(it.buffer));
        offerToSave.offer.photos.push({path: previewPath, mimetype: it.mimetype});
        index++;
      }
    }

    await router.offersStore.save(offerToSave);
    dataRenderer.renderDataSuccess(req, res, Object.assign({}, offerToSave, {_id: void 0}));
  }));
};
