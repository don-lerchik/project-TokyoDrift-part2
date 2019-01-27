const offerGenerate = require(`./offer-generator`);
const VARIABLES = require(`../../scr/untils/variable`);

module.exports = Array(VARIABLES.DEFAULT_VALUE_TEST_DATA).fill(null).map(() => offerGenerate());
