const Cursor = require(`./cursor-mock`);
const offersTestData = require(`../generator/offers-data`);

class OfferStoreMock {
  constructor(data) {
    this.data = data;
  }

  async getOffer(date) {
    return this.data.find((it) => it.date === Number(date));
  }

  async getAllOffers() {
    return new Cursor(this.data);
  }

  async save() {

  }

}

module.exports = new OfferStoreMock(offersTestData);
