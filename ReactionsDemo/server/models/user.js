const path = require("path");
const Datastore = require("../lib/datastore");
const sortUtil = require("../util/sort");

const db = new Datastore({
  filename: path.join(__dirname, "../data/users.db")
});

class User {
  constructor(rawUser) {
    const { _id: id, createdAt, username } = rawUser;
    this.createdAt = createdAt == null ? Date.now() : createdAt;
    this.id = id;
    this.username = username;
  }

  static getAll() {
    return db
      .find({})
      .then(rawUsers =>
        sortUtil.sortByCreation(rawUsers).map(rawUser => new User(rawUser))
      );
  }

  static getById(id) {
    return db.findOne({ _id: id }).then(rawUser => new User(rawUser));
  }

  save() {
    return db.update({ _id: this.id }, this.serialize(), { upsert: true });
  }

  serialize() {
    return {
      createdAt: this.createdAt,
      username: this.username
    };
  }
}

module.exports = User;
