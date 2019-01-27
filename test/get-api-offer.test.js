const request = require(`supertest`);
const assert = require(`assert`);
const express = require(`express`);

const offersTestData = require(`./generator/offers-data`);
const offersStoreMock = require(`./mock/offer-store-mock`);
const MockImageStore = require(`./mock/image-store-mock`);
const VARIABLES = require(`../scr/untils/variable`);
const randomize = require(`../scr/untils/randomize`);
const avatarStore = new MockImageStore(`avatar`);
const previewStore = new MockImageStore(`preview`);

const offersRoute = require(`../scr/server/offer/routers/route`)(offersStoreMock, avatarStore, previewStore);

const app = express();
app.use(`/api/offers`, offersRoute);

describe(`GET /api/offers -- (correct)`, () => {
  it(`get all ${VARIABLES.MAX_VALUE_TEST_DATA} offers -- (correct api)`, async () => {
    const response = await request(app)
      .get(`/api/offers`)
      .set(`Accept`, `application/json`)
      .expect(VARIABLES.STATUS_CODE.OK)
      .expect(`Content-Type`, /json/);

    const requestData = response.body;
    assert.strictEqual(requestData.total, offersTestData.length);
  });

  it(`get skip something offers -- (correct skip)`, async () => {
    const random = randomize.getInteger(VARIABLES.MIN_VALUE_TEST_DATA, VARIABLES.MAX_VALUE_TEST_DATA);
    const response = await request(app)
      .get(`/api/offers?skip=${random}`)
      .set(`Accept`, `application/json`)
      .expect(VARIABLES.STATUS_CODE.OK)
      .expect(`Content-Type`, /json/);

    const requestData = response.body;
    assert.equal(requestData.data.length, offersTestData.slice(random, VARIABLES.MAX_VALUE_TEST_DATA).length);
    assert.equal(requestData.skip, random);
  });

  it(`get limit something offers -- (correct limit)`, async () => {
    const random = randomize.getInteger(VARIABLES.MIN_VALUE_TEST_DATA + 1, VARIABLES.MAX_VALUE_TEST_DATA);
    const response = await request(app)
      .get(`/api/offers?limit=${random}`)
      .set(`Accept`, `application/json`)
      .expect(VARIABLES.STATUS_CODE.OK)
      .expect(`Content-Type`, /json/);

    const requestData = response.body;
    assert.equal(requestData.data.length, offersTestData.slice(VARIABLES.MIN_VALUE_TEST_DATA, random).length);
    assert.equal(requestData.limit, random);
  });

  it(`get skip/limit something offers -- (correct skip/limit)`, async () => {
    const skip = randomize.getInteger(VARIABLES.MIN_VALUE_TEST_DATA + 1, VARIABLES.MAX_VALUE_TEST_DATA);
    const limit = randomize.getInteger(VARIABLES.MIN_VALUE_TEST_DATA + 1, VARIABLES.MAX_VALUE_TEST_DATA);
    const response = await request(app)
      .get(`/api/offers?skip=${skip}&limit=${limit}`)
      .set(`Accept`, `application/json`)
      .expect(VARIABLES.STATUS_CODE.OK)
      .expect(`Content-Type`, /json/);
    const requestData = response.body;
    assert.equal(requestData.data.length, offersTestData.slice(skip).slice(0, limit).length);
    assert.equal(requestData.skip, skip);
    assert.equal(requestData.limit, limit);
  });
});

describe(`GET /api/offers -- (NOT correct)`, () => {

  it(`get all ${VARIABLES.MAX_VALUE_TEST_DATA} offers -- (NOT correct api)`, async () => {
    return await request(app)
      .get(`/api/offers` + `something`)
      .set(`Accept`, `text/html`)
      .expect(VARIABLES.STATUS_CODE.NOT_FOUND)
      .expect(`Content-Type`, /html/);
  });

  it(`get skip something offers -- (NOT correct skip ,value skip more than the number of ads) in HTML format`, async () => {
    const random = randomize.getInteger(VARIABLES.MAX_VALUE_TEST_DATA + 1, VARIABLES.MAX_VALUE_TEST_DATA + 100);
    return await request(app)
      .get(`/api/offers?skip=${random}`)
      .set(`Accept`, `text/html`)
      .expect(VARIABLES.STATUS_CODE.BAD_REQUEST)
      .expect(`Content-Type`, /html/);
  });

  it(`get skip something offers -- (NOT correct skip ,value skip more than the number of ads ) in JSON format`, async () => {
    const random = randomize.getInteger(VARIABLES.MAX_VALUE_TEST_DATA + 1, VARIABLES.MAX_VALUE_TEST_DATA + 100);
    return await request(app)
      .get(`/api/offers?skip=${random}`)
      .set(`Accept`, `application/json`)
      .expect(VARIABLES.STATUS_CODE.BAD_REQUEST)
      .expect(`Content-Type`, /json/);
  });

  it(`get skip something offers -- (NOT correct skip , value skip not number) in HTML format`, async () => {
    const random = randomize.getString();
    return await request(app)
      .get(`/api/offers?skip=${random}`)
      .set(`Accept`, `text/html`)
      .expect(VARIABLES.STATUS_CODE.BAD_REQUEST)
      .expect(`Content-Type`, /html/);
  });


  it(`get skip something offers -- (NOT correct skip , value skip not number) in JSON format`, async () => {
    const random = randomize.getString();
    return await request(app)
      .get(`/api/offers?skip=${random}`)
      .set(`Accept`, `application/json`)
      .expect(VARIABLES.STATUS_CODE.BAD_REQUEST)
      .expect(`Content-Type`, /json/);
  });

  it(`get limit something offers -- (NOT correct limit , value limit not number) in HTML format`, async () => {
    const random = randomize.getString();
    return await request(app)
      .get(`/api/offers?limit=${random}`)
      .set(`Accept`, `text/html`)
      .expect(VARIABLES.STATUS_CODE.BAD_REQUEST)
      .expect(`Content-Type`, /html/);
  });

  it(`get limit something offers -- (NOT correct limit , value limit not number) in JSON format`, async () => {
    const random = randomize.getString();
    return await request(app)
      .get(`/api/offers?limit=${random}`)
      .set(`Accept`, `application/json`)
      .expect(VARIABLES.STATUS_CODE.BAD_REQUEST)
      .expect(`Content-Type`, /json/);
  });

  it(`get skip something offers -- (NOT correct skip, value skip more than the number of ads)in HTML format`, async () => {
    const skip = randomize.getInteger(VARIABLES.MAX_VALUE_TEST_DATA + 1, VARIABLES.MAX_VALUE_TEST_DATA + 100);
    return await request(app)
      .get(`/api/offers?skip=${skip}`)
      .set(`Accept`, `text/html`)
      .expect(VARIABLES.STATUS_CODE.BAD_REQUEST)
      .expect(`Content-Type`, /html/);
  });

  it(`get skip something offers -- (NOT correct skip, value skip more than the number of ads) in JSON format`, async () => {
    const skip = randomize.getInteger(VARIABLES.MAX_VALUE_TEST_DATA + 1, VARIABLES.MAX_VALUE_TEST_DATA + 100);
    return await request(app)
      .get(`/api/offers?skip=${skip}`)
      .set(`Accept`, `application/json`)
      .expect(VARIABLES.STATUS_CODE.BAD_REQUEST)
      .expect(`Content-Type`, /json/);
  });

});

describe(`get /api/offers/:date -- (correct date)`, () => {
  it(`get offer with correct date and finded offers`, async () => {
    const OFFER_INDEX = 0;
    const offer = offersTestData[OFFER_INDEX];

    const response = await request(app)
      .get(`/api/offers/${offer.date}`)
      .set(`Accept`, `application/json`)
      .expect(VARIABLES.STATUS_CODE.OK)
      .expect(`Content-Type`, /json/);

    const requestData = response.body;
    assert.equal(requestData.date, offer.date);
    assert.deepStrictEqual(requestData, offer);
  });

  it(`get offer with correct date and no finded offers in HTML format`, async () => {
    const NINE_DAYS = 1000 * 60 * 60 * 24 * 9;
    return await request(app)
      .get(`/api/offers/${Date.now() - NINE_DAYS}`)
      .set(`Accept`, `text/html`)
      .expect(VARIABLES.STATUS_CODE.NOT_FOUND)
      .expect(`Content-Type`, /html/);
  });

  it(`get offer with correct date and no finded offers in JSON format`, async () => {
    const NINE_DAYS = 1000 * 60 * 60 * 24 * 9;
    return await request(app)
      .get(`/api/offers/${Date.now() - NINE_DAYS}`)
      .set(`Accept`, `application/json`)
      .expect(VARIABLES.STATUS_CODE.NOT_FOUND)
      .expect(`Content-Type`, /json/);
  });

});
describe(`get /api/offers/:date -- (not correct date)`, () => {
  it(`get offer with not correct date`, async () => {
    const random = randomize.getString();
    return await request(app)
      .get(`/api/offers/${random}`)
      .set(`Accept`, `text/html`)
      .expect(VARIABLES.STATUS_CODE.BAD_REQUEST)
      .expect(`Content-Type`, /html/);
  });
});

