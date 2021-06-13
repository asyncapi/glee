const { pathToRegexp } = require('path-to-regexp');
const Message = require('./message');

const util = module.exports;

/**
 * Creates a GleeMessage from any payload and channel.
 *
 * @param {Glee} glee A reference to the Glee app.
 * @param {Any} payload The payload of the message.
 * @param {Any} headers The headers of the message.
 * @param {String} [channel] The channel of the message.
 * @return {GleeMessage}
 */
util.createMessage = (glee, payload, headers, channel) => {
  return (payload instanceof Message ? payload : new Message(glee, payload, headers, channel));
};

/**
 * Duplicates a GleeMessage.
 *
 * @param {GleeMessage} message The message to duplicate.
 * @return {GleeMessage}
 */
util.duplicateMessage = (message) => {
  const newMessage = new Message(message.glee, message.payload, message.headers, message.channel);
  newMessage.inbound = message.inbound;
  newMessage.outbound = message.outbound;
  newMessage.connection = message.connection;
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
