const VARIABLES = {
  SUCCESS_EXIT_CODE: 0,
  FAILURE_EXIT_CODE: 1,
  POSITIVE_ANSWER: `y`,
  NEGATIVE_ANSWER: `n`,
  MIN_VALUE_TEST_DATA: 0,
  MAX_VALUE_TEST_DATA: 20,
  DEFAULT_VALUE_TEST_DATA: 20,
  OFFERS_DATA_SKIP: 0,
  OFFERS_DATA_LIMIT: 20,
  NO_USE_SYMBOL_TO_PATH: [`?`, `*`, `>`, `<`, `:`, `|`],
  PATH_TO_SAVE_TEST_DATA: `${process.cwd()}/test/offer-test-data.json`,
  FILE_WRITE_OPTION: {encoding: `utf-8`, mode: 0o644},
  SERVER_PORT: 3000,
  SERVER_HOST: `127.0.0.1`,
  MONGO_URL: `mongodb://localhost:27017`,
  STATUS_CODE: {
    OK: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
  },
  IMAGE_MIMETYPES: [`image/png`, `image/jpg`, `image/jpeg`, `image/gif`],
};

module.exports = VARIABLES;
