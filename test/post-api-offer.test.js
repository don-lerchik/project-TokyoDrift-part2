const request = require(`supertest`);
const assert = require(`assert`);
const express = require(`express`);

const offersStoreMock = require(`./mock/offer-store-mock`);
const MockImageStore = require(`./mock/image-store-mock`);

const VARIABLES = require(`../scr/untils/variable`);
const OfferContent = require(`../scr/untils/offer-content`);
const {offersValidateShema} = require(`../scr/server/offer/routers/validate-offers`);

const avatarStore = new MockImageStore(`avatar`);
const previewStore = new MockImageStore(`preview`);

const offersRoute = require(`../scr/server/offer/routers/route`)(offersStoreMock, avatarStore, previewStore);

const app = express();
app.use(`/api/offers`, offersRoute);

const CORRECT_POST_OFFER = {
  name: `Keks`,
  title: `Huge apartments in the city center overlooking the large park`,
  adress: `Otemachi, Chiyoda, Tokyo 100-0004`,
  coordinate: `405,264`,
  price: 30000,
  type: `palac`,
  rooms: 3,
  guests: 5,
  checkin: `12:00`,
  checkout: `14:00`,
  features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  description: `Spacious and comfortable apartments in the heart of the city. With all the necessary amenities. Close to the cultural center. Every whim for your money !`
};

const CORRECT_EXPECT_OFFER = {
  author: {
    name: `Keks`
  },
  offer: {
    title: `Huge apartments in the city center overlooking the large park`,
    adress: `Otemachi, Chiyoda, Tokyo 100-0004`,
    price: 30000,
    type: `palac`,
    rooms: 3,
    guests: 5,
    checkin: `12:00`,
    checkout: `14:00`,
    features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
    description: `Spacious and comfortable apartments in the heart of the city. With all the necessary amenities. Close to the cultural center. Every whim for your money !`,
    photos: []
  },
  location: {
    x: 405,
    y: 264
  },
  date: Date.now()
};

const CORRECT_EXPECT_OFFER_WITH_FILE = {
  author: {
    name: `Keks`,
    avatar: {
      path: ``,
      mimetype: `image/png`
    }
  },
  offer: {
    title: `Huge apartments in the city center overlooking the large park`,
    adress: `Otemachi, Chiyoda, Tokyo 100-0004`,
    price: 30000,
    type: `palac`,
    rooms: 3,
    guests: 5,
    checkin: `12:00`,
    checkout: `14:00`,
    features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
    description: `Spacious and comfortable apartments in the heart of the city. With all the necessary amenities. Close to the cultural center. Every whim for your money !`,
    photos: [
      {
        path: ``,
        mimetype: `image/jpeg`
      },
      {
        path: ``,
        mimetype: `image/jpeg`
      }
    ]
  },
  location: {
    x: 405,
    y: 264
  }
};
// the order of the fields is important since the error message is formed into an array of objects without specifying the keys
const EXPECT_ERROR_MESSAGE = {
  code: VARIABLES.STATUS_CODE.BAD_REQUEST,
  name: `Validation Error`,
  messages: [
    {
      field: `title`,
      message: offersValidateShema.title.errorMessage
    },
    {
      field: `type`,
      message: offersValidateShema.type.errorMessage
    },
    {
      field: `price`,
      message: offersValidateShema.price.errorMessage
    },
    {
      field: `guests`,
      message: offersValidateShema.guests.errorMessage
    },
    {
      field: `checkin`,
      message: offersValidateShema.checkin.errorMessage
    },
    {
      field: `checkout`,
      message: offersValidateShema.checkout.errorMessage
    },
    {
      field: `rooms`,
      message: offersValidateShema.rooms.errorMessage
    },
    {
      field: `adress`,
      message: offersValidateShema.adress.errorMessage
    },
    {
      field: `coordinate`,
      message: offersValidateShema.coordinate.errorMessage
    },
    {
      field: `features`,
      message: offersValidateShema.features.errorMessage
    },
    {
      field: `description`,
      message: offersValidateShema.description.errorMessage
    }
  ]
};

describe(`POST /api/offers (correct)`, () => {
  it(`send offer as json`, async () => {
    const response = await request(app).
      post(`/api/offers`).
      send(CORRECT_POST_OFFER).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `application/json`).
      expect(VARIABLES.STATUS_CODE.OK).
      expect(`Content-Type`, /json/);
    const data = response.body;
    assert.deepEqual(data.offer, CORRECT_EXPECT_OFFER.offer);
    assert.deepEqual(data.author, CORRECT_EXPECT_OFFER.author);
    assert.deepEqual(data.location, CORRECT_EXPECT_OFFER.location);
  });

  it(`send offer as multipart/form-data`, async () => {
    const response = await request(app).
      post(`/api/offers`).
      field(`name`, CORRECT_POST_OFFER.name).
      field(`title`, CORRECT_POST_OFFER.title).
      field(`adress`, CORRECT_POST_OFFER.adress).
      field(`coordinate`, CORRECT_POST_OFFER.coordinate).
      field(`price`, CORRECT_POST_OFFER.price).
      field(`type`, CORRECT_POST_OFFER.type).
      field(`rooms`, CORRECT_POST_OFFER.rooms).
      field(`guests`, CORRECT_POST_OFFER.guests).
      field(`checkin`, CORRECT_POST_OFFER.checkin).
      field(`checkout`, CORRECT_POST_OFFER.checkout).
      field(`features`, CORRECT_POST_OFFER.features).
      field(`description`, CORRECT_POST_OFFER.description).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `multipart/form-data`).
      expect(VARIABLES.STATUS_CODE.OK).
      expect(`Content-Type`, /json/);
    const data = response.body;
    assert.deepEqual(data.offer, CORRECT_EXPECT_OFFER.offer);
    assert.deepEqual(data.author, CORRECT_EXPECT_OFFER.author);
    assert.deepEqual(data.location, CORRECT_EXPECT_OFFER.location);
  });

  it(`send offer as multipart/form-data with file`, async () => {
    const response = await request(app).
      post(`/api/offers`).
      field(`name`, CORRECT_POST_OFFER.name).
      field(`title`, CORRECT_POST_OFFER.title).
      field(`adress`, CORRECT_POST_OFFER.adress).
      field(`coordinate`, CORRECT_POST_OFFER.coordinate).
      field(`price`, CORRECT_POST_OFFER.price).
      field(`type`, CORRECT_POST_OFFER.type).
      field(`rooms`, CORRECT_POST_OFFER.rooms).
      field(`guests`, CORRECT_POST_OFFER.guests).
      field(`checkin`, CORRECT_POST_OFFER.checkin).
      field(`checkout`, CORRECT_POST_OFFER.checkout).
      field(`features`, CORRECT_POST_OFFER.features).
      field(`description`, CORRECT_POST_OFFER.description).
      attach(`avatar`, `test/fixtures/Keks.png`).
      attach(`preview`, `test/fixtures/photo_1.jpg`).
      attach(`preview`, `test/fixtures/photo_2.jpg`).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `multipart/form-data`).
      expect(VARIABLES.STATUS_CODE.OK).
      expect(`Content-Type`, /json/);
    const data = response.body;
    CORRECT_EXPECT_OFFER_WITH_FILE.author.avatar.path = `/api/offers/${data.date}/avatar`;
    CORRECT_EXPECT_OFFER_WITH_FILE.offer.photos[0].path = `/api/offers/${data.date}/preview/1`;
    CORRECT_EXPECT_OFFER_WITH_FILE.offer.photos[1].path = `/api/offers/${data.date}/preview/2`;
    assert.deepEqual(data.offer, CORRECT_EXPECT_OFFER_WITH_FILE.offer);
    assert.deepEqual(data.author, CORRECT_EXPECT_OFFER_WITH_FILE.author);
    assert.deepEqual(data.location, CORRECT_EXPECT_OFFER_WITH_FILE.location);
  });
});
describe(`POST /api/offers (not correct)`, () => {
  // the order of the fields is important since the error message is formed into an array of objects without specifying the keys
  it(`send offer as multipart/form-data with file (not correct post data)`, async () => {
    const response = await request(app).
      post(`/api/offers`).
      field(`title`, `Title length less than ${OfferContent.titleLength.MIN}`).
      field(`type`, `mouse`).
      field(`price`, `wrong format`).
      field(`guests`, OfferContent.countGuests.MAX + 10).
      field(`checkin`, `00:00`).
      field(`checkout`, `not time`).
      field(`rooms`, OfferContent.countRooms.MAX + 10).
      field(`adress`, `Title length more than ${OfferContent.adressLength.MAX} Title length more than ${OfferContent.adressLength.MAX} Title length more than ${OfferContent.adressLength.MAX} Title length more than ${OfferContent.adressLength.MAX} Title length more than ${OfferContent.adressLength.MAX} Title length more than ${OfferContent.adressLength.MAX} `).
      field(`coordinate`, `${OfferContent.coordinate.MIN_X - 100},${OfferContent.coordinate.MAX_Y + 100}`).
      field(`features`, [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`, `mouse`]).
      field(`description`, [`123`, `123`]).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `multipart/form-data`).
      expect(VARIABLES.STATUS_CODE.BAD_REQUEST).
      expect(`Content-Type`, /json/);
    const data = response.body;
    assert.deepEqual(data, EXPECT_ERROR_MESSAGE);
  });

  it(`send offer as multipart/form-data with file (not correct file data)`, async () => {
    const response = await request(app).
      post(`/api/offers`).
      field(`name`, CORRECT_POST_OFFER.name).
      field(`title`, CORRECT_POST_OFFER.title).
      field(`adress`, CORRECT_POST_OFFER.adress).
      field(`coordinate`, CORRECT_POST_OFFER.coordinate).
      field(`price`, CORRECT_POST_OFFER.price).
      field(`type`, CORRECT_POST_OFFER.type).
      field(`rooms`, CORRECT_POST_OFFER.rooms).
      field(`guests`, CORRECT_POST_OFFER.guests).
      field(`checkin`, CORRECT_POST_OFFER.checkin).
      field(`checkout`, CORRECT_POST_OFFER.checkout).
      field(`features`, CORRECT_POST_OFFER.features).
      field(`description`, CORRECT_POST_OFFER.description).
      attach(`avatar`, `test/fixtures/avatar.txt`).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `multipart/form-data`).
      expect(VARIABLES.STATUS_CODE.BAD_REQUEST).
      expect(`Content-Type`, /json/);
    const data = response.body;
    assert.deepEqual(data.code, VARIABLES.STATUS_CODE.BAD_REQUEST);
    assert.deepEqual(data.name, `Validation Error`);
  });
});
