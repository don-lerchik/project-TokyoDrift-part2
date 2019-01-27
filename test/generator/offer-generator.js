const Randomize = require(`../../scr/untils/randomize`);
const OfferContent = require(`../../scr/untils/offer-content`);

const AVATAR_URL_BASE = `https://robohash.org`;

const offerGenerate = () => {

  const avatarUrl = `${AVATAR_URL_BASE}/${Randomize.getString()}`;
  const arrayPhoto = () => {
    const length = Randomize.getInteger(0, 10);
    const array = [];
    for (let index = 0; index < length; index++) {
      array.push({
        'path': Randomize.getArrayElem(OfferContent.photosHouse),
        'mimetype': `image/jpeg`
      });
    }
    return array;
  };

  const location = {
    'x': Randomize.getInteger(OfferContent.coordinate.MIN_X, OfferContent.coordinate.MAX_X),
    'y': Randomize.getInteger(OfferContent.coordinate.MIN_Y, OfferContent.coordinate.MAX_Y)
  };

  return {
    'author': {
      'name': Randomize.getArrayElem(OfferContent.names),
      'avatar': {
        'path': avatarUrl,
        'mimetype': `image/png`
      }
    },
    'offer': {
      'title': Randomize.getArrayElem(OfferContent.titlesHouse),
      'type': Randomize.getArrayElem(OfferContent.type),
      'price': Randomize.getInteger(OfferContent.price.MIN, OfferContent.price.MAX),
      'guests': Randomize.getInteger(OfferContent.countGuests.MIN, OfferContent.countGuests.MAX),
      'checkin': Randomize.getArrayElem(OfferContent.checkIn),
      'checkout': Randomize.getArrayElem(OfferContent.checkOut),
      'rooms': Randomize.getInteger(OfferContent.countRooms.MIN, OfferContent.countRooms.MAX),
      'adress': `улица бассейная ${Randomize.getInteger(0, 100)}`,
      'features': Randomize.getRandomArray(OfferContent.features),
      'description': `${Randomize.getString()}`,
      'photos': arrayPhoto()
    },
    'location': {
      'x': location.x,
      'y': location.y,
    },
    'date': Randomize.getDateInInterval(OfferContent.daysInterval),
  };
};

module.exports = offerGenerate;
