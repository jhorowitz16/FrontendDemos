const NedbDatastore = require("nedb");
const util = require("util");

class Datastore extends NedbDatastore {
  constructor(config) {
    super({ ...config, autoload: true });
    // Promisify all of NeDB's methods for better ergonomics
    this.update = util.promisify(super.update.bind(this));
    this.find = util.promisify(super.find.bind(this));
    this.insert = util.promisify(super.insert.bind(this));
    this.remove = util.promisify(super.remove.bind(this));
    this.findOne = util.promisify(super.findOne.bind(this));
  }
}

module.exports = Datastore;
