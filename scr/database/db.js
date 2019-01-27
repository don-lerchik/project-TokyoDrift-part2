const {MongoClient} = require(`mongodb`);
const VARIABLES = require(`../untils/variable`);
const logger = require(`../untils/winston-logger`);

const URL = process.env.MONDO_URL || VARIABLES.MONGO_URL;

module.exports = MongoClient.connect(URL, {useNewUrlParser: true})
  .then((client) => client.db(`tokyo_drift`))
  .catch((err) => {
    logger.error(`Failed to connect to MongoDB`, err);
    process.exit(VARIABLES.FAILURE_EXIT_CODE);
  });


