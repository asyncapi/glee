const { pathToRegexp } = require('path-to-regexp');
const Message = require('./message');

const util = module.exports;

/**
 * Creates a EvolveMessage from any payload and channel.
 *
 * @param {Evolve} evolve A reference to the Evolve app.
 * @param {Any} payload The payload of the message.
 * @param {Any} headers The headers of the message.
 * @param {String} [channel] The channel of the message.
 * @return {EvolveMessage}
 */
util.createMessage = (evolve, payload, headers, channel) => {
  return (payload instanceof Message ? payload : new Message(evolve, payload, headers, channel));
};

/**
 * Duplicates a EvolveMessage.
 *
 * @param {EvolveMessage} message The message to duplicate.
 * @return {EvolveMessage}
 */
util.duplicateMessage = (message) => {
  const newMessage = new Message(message.evolve, message.payload, message.headers, message.channel);
  newMessage.inbound = message.inbound;
  newMessage.outbound = message.outbound;
  return newMessage;
};

/**
 * Determines if a path matches a channel.
 *
 * @param {String} path The path.
 * @param {String} channel The channel.
 * @return {Boolean}
 */
util.matchchannel = (path, channel) => {
  return (this.getParams(path, channel) !== null);
};

/**
 * Determines if a path matches a channel, and returns an array of matching params.
 *
 * @param {String} path The path.
 * @param {String} channel The channel.
 * @return {Object|null}
 */
util.getParams = (path, channel) => {
  if (path === undefined) return {};

  const keys = [];
  const re = pathToRegexp(path, keys);
  const result = re.exec(channel);

  if (result === null) return null;

  return keys.map((key, index) => ({ [key.name]: result[index+1] })).reduce((prev, val) => ({
    ...prev,
    ...val,
  }), {});
};
