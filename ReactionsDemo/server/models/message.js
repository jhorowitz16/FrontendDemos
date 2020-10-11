const path = require("path");
const Datastore = require("../lib/datastore");
const sortUtil = require("../util/sort");
const { MESSAGE_LIMIT } = require("../constants");

const db = new Datastore({
  filename: path.join(__dirname, "../data/messages.db")
});

class Message {
  constructor(rawMessage) {
    const { _id: id, channelId, content, createdAt, userId, reactions} = rawMessage;
    this.createdAt = createdAt == null ? Date.now() : createdAt;
    this.id = id;
    this.channelId = channelId;
    this.content = content;
    this.userId = userId;
    this.reactions = reactions;
  }

  static getAll() {
    return db
      .find({})
      .then(rawMessages =>
        sortUtil
          .sortByCreation(rawMessages)
          .map(rawMessage => new Message(rawMessage))
      );
  }

  static getById(id) {
    return db.findOne({ _id: id }).then(rawMessage => {
      if (rawMessage != null) {
        return new Message(rawMessage);
      }
    });
  }

  static getByChannelId(channelId) {
    return db
      .find({ channelId })
      .then(rawMessages =>
        rawMessages.map(rawMessage => new Message(rawMessage))
      );
  }

  validate() {
    if (this.content.length > MESSAGE_LIMIT) {
      throw new Error("Message length exceeded");
    }
  }

  save() {
    try {
      this.validate();
      return db.update({ _id: this.id }, this.serialize(), { upsert: true });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  serialize() {
    return {
      channelId: this.channelId,
      content: this.content,
      createdAt: this.createdAt,
      userId: this.userId,
      reactions: this.reactions,
    };
  }
}

module.exports = Message;
