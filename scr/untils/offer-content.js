const OfferContent = {
  names: [`Keks`, `Pavel`, `Nikolay`, `Alex`, `Ulyana`, `Anastasyia`, `Julia`],

  titleLength: {
    MIN: 30,
    MAX: 140
  },

  price: {
    MIN: 1000,
    MAX: 1000000,
  },

  coordinate: {
    MIN_X: 50,
    MAX_X: 1200,
    MIN_Y: 200,
    MAX_Y: 700,
  },
  adressLength: {
    MIN: 10,
    MAX: 100
  },

  countRooms: {
    MIN: 1,
    MAX: 5,
  },

  countGuests: {
    MIN: 1,
    MAX: 100,
  },

  checkIn: [`12:00`, `13:00`, `14:00`],

  checkOut: [`12:00`, `13:00`, `14:00`],

  type: [`flat`, `palac`, `house`, `bungalo`],

  titlesHouse: [`Большая уютная квартира`, `Маленькая неуютная квартира`, `Огромный прекрасный дворец`, `Маленький ужасный дворец`, `Красивый гостевой домик`, `Некрасивый негостеприимный домик`, `Уютное бунгало далеко от моря`, `Неуютное бунгало по колено в воде`],

  features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],

  photosHouse: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],

  daysInterval: 7

};

module.exports = OfferContent;
