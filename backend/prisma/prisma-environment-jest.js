const NodeEnvironment = require('jest-environment-node').TestEnvironment;
const { v4: uuid } = require('uuid');
const { execSync } = require('child_process');
const { resolve } = require('path');

const prismaCli = './node_modules/.bin/prisma';

require('dotenv').config({
  path: resolve(__dirname, '..', '../.env.test'),
});

class CustomEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    this.schema = `golden_raspberry_awards_${uuid()}`;
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    // run migrations
    execSync(`${prismaCli} migrate dev`);
  }

}

module.exports = CustomEnvironment;