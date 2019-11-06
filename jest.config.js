const merge = require('merge');
const tsJest = require('ts-jest/jest-preset');
const tsJestMongo = require('@shelf/jest-mongodb/jest-preset');
module.exports = merge.recursive(tsJest, tsJestMongo, {
  roots: [
      "test"
  ],
});