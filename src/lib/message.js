"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var events_1 = require("events");
var GleeMessage = /** @class */ (function (_super) {
    __extends(GleeMessage, _super);
    /**
     * Instantiates a new GleeMessage.
     *
     * @param {Object} options
     * @param {Any} [options.payload] Message payload.
     * @param {Object} [options.headers] Message headers.
     * @param {String} [options.channel] Message channel.
     * @param {String} [options.serverName] The name of the associated AsyncAPI server.
     * @param {GleeConnection} [options.connection] The connection through which the message will be sent or has been received.
     * @param {Boolean} [options.broadcast=false] Whether the message should be broadcasted or not.
     * @param {Boolean} [options.cluster=false] Whether the message is from a cluster adapter or not.
     */
    function GleeMessage(_a) {
        var payload = _a.payload, headers = _a.headers, channel = _a.channel, serverName = _a.serverName, connection = _a.connection, _b = _a.broadcast, broadcast = _b === void 0 ? false : _b, _c = _a.cluster, cluster = _c === void 0 ? false : _c;
        var _this = _super.call(this) || this;
        if (payload)
            _this._payload = payload;
        if (headers)
            _this._headers = headers;
        if (channel)
            _this._channel = channel;
        if (serverName)
            _this._serverName = serverName;
        if (connection)
            _this._connection = connection;
        if (broadcast)
            _this._broadcast = !!broadcast;
        if (cluster)
            _this._cluster = cluster;
        return _this;
    }
    Object.defineProperty(GleeMessage.prototype, "payload", {
        get: function () {
            return this._payload;
        },
        set: function (value) {
            this._payload = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeMessage.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        set: function (value) {
            this._headers = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeMessage.prototype, "channel", {
        get: function () {
            return this._channel;
        },
        set: function (value) {
            this._channel = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeMessage.prototype, "serverName", {
        get: function () {
            return this._serverName;
        },
        set: function (value) {
            this._serverName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeMessage.prototype, "connection", {
        get: function () {
            return this._connection;
        },
        set: function (value) {
            this._connection = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeMessage.prototype, "broadcast", {
        get: function () {
            return this._broadcast;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeMessage.prototype, "params", {
        get: function () {
            return this._params;
        },
        set: function (value) {
            this._params = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeMessage.prototype, "cluster", {
        get: function () {
            return this._cluster;
        },
        set: function (value) {
            this._cluster = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sends the message back to the server/broker.
     *
     * @param {Object} options
     * @param {Any} [options.payload] The new message payload. Pass falsy value if you don't want to change it.
     * @param {Object|null} [options.headers] The new message headers. Pass null if you want to remove them.
     * @param {String} [options.channel] The channel where the reply should go to.
     */
    GleeMessage.prototype.reply = function (_a) {
        var payload = _a.payload, headers = _a.headers, channel = _a.channel;
        if (payload)
            this._payload = payload;
        if (headers !== undefined) {
            if (headers === null) {
                this._headers = undefined;
            }
            else {
                this._headers = headers;
            }
        }
        if (channel !== undefined) {
            if (typeof channel === 'string') {
                this._channel = channel;
            }
            else {
                return console.error('GleeMessage.reply(): when specified, "channel" must be a string.');
            }
        }
        this.send();
    };
    /**
     * Makes the message suitable only for the inbound pipeline.
     */
    GleeMessage.prototype.setInbound = function () {
        this._inbound = true;
        this._outbound = false;
    };
    /**
     * Makes the message suitable only for the outbound pipeline.
     */
    GleeMessage.prototype.setOutbound = function () {
        this._inbound = false;
        this._outbound = true;
    };
    /**
     * Checks if it's an inbound message.
     */
    GleeMessage.prototype.isInbound = function () {
        return this._inbound && !this._outbound;
    };
    /**
     * Checks if it's an outbound message.
     */
    GleeMessage.prototype.isOutbound = function () {
        return this._outbound && !this._inbound;
    };
    /**
     * Tells Glee to send the message.
     */
    GleeMessage.prototype.send = function () {
        this.emit('send', this);
    };
    return GleeMessage;
}(events_1["default"]));
exports["default"] = GleeMessage;
