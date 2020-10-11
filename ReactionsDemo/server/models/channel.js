const path = require("path");
const Datastore = require("../lib/datastore");
const sortUtil = require("../util/sort");

const db = new Datastore({
  filename: path.join(__dirname, "../data/channels.db")
});

class Channel {
  constructor(rawChannel) {
    const { _id: id, createdAt, name } = rawChannel;
    this.createdAt = createdAt == null ? Date.now() : createdAt;
    this.id = id;
    this.name = name;
  }

  static getAll() {
    return db
      .find({})
      .then(rawChannels =>
        sortUtil
          .sortByCreation(rawChannels)
          .map(rawChannel => new Channel(rawChannel))
      );
  }

  static getById(id) {
    return db.findOne({ _id: id }).then(rawChannel => new Channel(rawChannel));
  }

  save() {
    return db.update({ _id: this.id }, this.serialize(), { upsert: true });
  }

  serialize() {
    return {
      createdAt: this.createdAt,
      name: this.name
    };
  }
}

module.exports = Channel;
