"use strict";
exports.__esModule = true;
var GleeConnection = /** @class */ (function () {
    /**
     * Instantiates a Glee connection.
     *
     * @param {Object} options
     * @param {any} options.connection The raw connection object this GleeConnection has to represent.
     * @param {String[]} options.channels The name of the channels associated to this connection.
     * @param {String} options.serverName  The name of the AsyncAPI server the connection is pointing to.
     * @param {AsyncAPIServer} options.server  The AsyncAPI server the connection is pointing to.
     * @param {AsyncAPIDocument} options.parsedAsyncAPI The AsyncAPI document.
     */
    function GleeConnection(_a) {
        var connection = _a.connection, channels = _a.channels, serverName = _a.serverName, server = _a.server, parsedAsyncAPI = _a.parsedAsyncAPI;
        this._rawConnection = connection;
        this._channels = channels;
        this._serverName = serverName;
        this._AsyncAPIServer = server;
        this._parsedAsyncAPI = parsedAsyncAPI;
    }
    Object.defineProperty(GleeConnection.prototype, "rawConnection", {
        get: function () {
            return this._rawConnection;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeConnection.prototype, "channels", {
        get: function () {
            return this._channels;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeConnection.prototype, "serverName", {
        get: function () {
            return this._serverName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeConnection.prototype, "AsyncAPIServer", {
        get: function () {
            return this._AsyncAPIServer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeConnection.prototype, "parsedAsyncAPI", {
        get: function () {
            return this._parsedAsyncAPI;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Checks whether a channel is associated with this connection.
     *
     * @param {String} channelName The name of the channel.
     * @return {Boolean}
     */
    GleeConnection.prototype.hasChannel = function (channelName) {
        return this.channels.includes(channelName);
    };
    /**
     * Returns the real connection object.
     *
     * @return {Any}
     */
    GleeConnection.prototype.getRaw = function () {
        return this.rawConnection;
    };
    return GleeConnection;
}());
exports["default"] = GleeConnection;
