const OfferContent = require(`../../../untils/offer-content`);
const ValidatorAnswer = require(`../../../untils/validator`);
const VARIABLES = require(`../../../untils/variable`);

const isRequire = (data, errMessage) => data ? null : errMessage;
const repareStringToArray = (string) => {
  let array = string.split(`,`);
  array = array.map((it) => {
    return it.trim();
  });
  return array;
};
const isLengthInRange = (min, max) => (data, errMessage) => data.length >= min && data.length < max ? null : errMessage;
const isElementInRange = (minX, maxX, minY, maxY) => (data, errMessage) => {
  const arrayData = repareStringToArray(data);
  const [coordinateX, coordinateY, ...somethingElse] = arrayData;
  if (somethingElse.length > 0) {
    return errMessage;
  }
  return ValidatorAnswer.getInegerInInerval(coordinateX, minX, maxX) && ValidatorAnswer.getInegerInInerval(coordinateY, minY, maxY) ? null : errMessage;
};
const isInArray = (array) => (data, errMessage) => array.includes(data) ? null : errMessage;
const isInRange = (min, max) => (data, errMessage) => ValidatorAnswer.getInegerInInerval(parseInt(data, 10), min, max) ? null : errMessage;
const getInvalidValues = (array) => (data, errMessage) => {
  if (!data || !data.length) {
    return null;
  }
  return data.every((elem) => array.includes(elem)) ? null : errMessage;
};
const isArrayOfUniqueValues = (data, errMessage) => data.length === new Set(data).size ? null : errMessage;
const isOptionalString = (data, errMessage) => (!data) || (typeof data === `string`) ? null : errMessage;

const offersValidateShema = {
  title: {
    validationFunctions: [isRequire, isLengthInRange(OfferContent.titleLength.MIN, OfferContent.titleLength.MAX)],
    errorMessage: `Enter value from ${OfferContent.titleLength.MIN} to ${OfferContent.titleLength.MAX} symbols`
  },
  type: {
    validationFunctions: [isRequire, isInArray(OfferContent.type)],
    errorMessage: `Enter one of the following values: ${OfferContent.type}`
  },
  price: {
    validationFunctions: [isRequire, isInRange(OfferContent.price.MIN, OfferContent.price.MAX)],
    errorMessage: `Enter value from ${OfferContent.price.MIN} to ${OfferContent.price.MAX}`
  },
  guests: {
    validationFunctions: [isRequire, isInRange(OfferContent.countGuests.MIN, OfferContent.countGuests.MAX)],
    errorMessage: `Enter value from ${OfferContent.countGuests.MIN} to ${OfferContent.countGuests.MAX}`
  },
  checkin: {
    validationFunctions: [isRequire, isInArray(OfferContent.checkIn)],
    errorMessage: `Enter the time of the following values: ${OfferContent.checkIn}`
  },
  checkout: {
    validationFunctions: [isRequire, isInArray(OfferContent.checkOut)],
    errorMessage: `Enter the time of the following values: ${OfferContent.checkOut}`
  },
  rooms: {
    validationFunctions: [isRequire, isInRange(OfferContent.countRooms.MIN, OfferContent.countRooms.MAX)],
    errorMessage: `Enter value from ${OfferContent.countRooms.MIN} to ${OfferContent.countRooms.MAX}`
  },
  adress: {
    validationFunctions: [isRequire, isLengthInRange(OfferContent.adressLength.MIN, OfferContent.adressLength.MAX)],
    errorMessage: `Enter value from ${OfferContent.adressLength.MIN} to ${OfferContent.adressLength.MAX} symbols`
  },
  coordinate: {
    validationFunctions: [isRequire, isElementInRange(OfferContent.coordinate.MIN_X, OfferContent.coordinate.MAX_X, OfferContent.coordinate.MIN_Y, OfferContent.coordinate.MAX_Y)],
    errorMessage: `Enter value from coordinate at first ${OfferContent.coordinate.MIN_X} to ${OfferContent.coordinate.MAX_X} number ,and second ${OfferContent.coordinate.MIN_Y} to ${OfferContent.coordinate.MAX_Y} number`
  },
  features: {
    validationFunctions: [getInvalidValues(OfferContent.features), isArrayOfUniqueValues],
    errorMessage: `Invalid value, enter one or more of the following values ${OfferContent.features}`
  },
  description: {
    validationFunctions: [isOptionalString],
    errorMessage: `Invalid value, enter description in string format`
  }
};

const validateOffers = (data, validateShema) => {
  const fields = Object.keys(validateShema);
  const errorArray = [];
  for (const field of fields) {
    for (const fn of offersValidateShema[field].validationFunctions) {
      const error = fn(data[field], offersValidateShema[field].errorMessage);
      if (error) {
        errorArray.push({
          fieldName: field,
          errorMessage: error
        });
        break;
      }
    }
  }
  return errorArray;
};


const isImageMimeType = (files) => {
  const errorArray = [];
  for (const it of files) {
    if (!VARIABLES.IMAGE_MIMETYPES.includes(it.mimetype)) {
      errorArray.push({
        fieldName: it,
        errorMessage: `Invalid file format ${it.originalname}`
      });
    }
  }
  return errorArray;
};

module.exports = {validateOffers, offersValidateShema, isImageMimeType};

