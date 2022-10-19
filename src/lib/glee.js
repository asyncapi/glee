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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var events_1 = require("events");
var async_1 = require("async");
var debug_1 = require("debug");
var router_js_1 = require("./router.js");
var message_js_1 = require("./message.js");
var util_js_1 = require("./util.js");
var debug = (0, debug_1["default"])('glee');
var Glee = /** @class */ (function (_super) {
    __extends(Glee, _super);
    /**
     * Instantiates Glee.
     *
     * @param {Object} [options={}]
     */
    function Glee(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this._options = options;
        _this._router = new router_js_1["default"]();
        _this._adapters = [];
        return _this;
    }
    Object.defineProperty(Glee.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Glee.prototype, "adapters", {
        get: function () {
            return this._adapters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Glee.prototype, "clusterAdapter", {
        get: function () {
            return this._clusterAdapter;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds a connection adapter.
     *
     * @param {GleeAdapter} adapter The adapter.
     * @param {String} serverName The name of the AsyncAPI Server to use with the adapter.
     * @param {AsyncAPIServer} server AsyncAPI Server to use with the adapter.
     * @param {AsyncAPIDocument} parsedAsyncAPI The AsyncAPI document.
     */
    Glee.prototype.addAdapter = function (Adapter, _a) {
        var serverName = _a.serverName, server = _a.server, parsedAsyncAPI = _a.parsedAsyncAPI;
        this._adapters.push({ Adapter: Adapter, serverName: serverName, server: server, parsedAsyncAPI: parsedAsyncAPI });
    };
    /**
     * Sets the cluster adapter to use.
     *
     * @param {GleeClusterAdapter} adapter The adapter.
     */
    Glee.prototype.setClusterAdapter = function (Adapter) {
        this._clusterAdapter = {
            Adapter: Adapter
        };
    };
    Glee.prototype.use = function (channel) {
        var _a;
        var middlewares = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            middlewares[_i - 1] = arguments[_i];
        }
        (_a = this._router).use.apply(_a, arguments); // eslint-disable-line prefer-rest-params
    };
    Glee.prototype.useOutbound = function (channel) {
        var _a;
        var middlewares = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            middlewares[_i - 1] = arguments[_i];
        }
        (_a = this._router).useOutbound.apply(_a, arguments); // eslint-disable-line prefer-rest-params
    };
    /**
     * Send a message to the adapters.
     *
     * @param {Object|GleeMessage} message The payload of the message you want to send.
     */
    Glee.prototype.send = function (message) {
        message.setOutbound();
        this._processMessage(this._router.getOutboundMiddlewares(), this._router.getOutboundErrorMiddlewares(), message);
    };
    /**
     * Tells the adapters to connect.
     */
    Glee.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises;
            var _this = this;
            return __generator(this, function (_a) {
                promises = [];
                this._adapters.forEach(function (a) {
                    a.instance = new a.Adapter(_this, a.serverName, a.server, a.parsedAsyncAPI);
                    promises.push(a.instance.connect());
                });
                if (this._clusterAdapter) {
                    this._clusterAdapter.instance = new this._clusterAdapter.Adapter(this);
                    promises.push(this._clusterAdapter.instance.connect());
                }
                return [2 /*return*/, Promise.all(promises)];
            });
        });
    };
    /**
     * Alias for `connect`.
     */
    Glee.prototype.listen = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connect()];
            });
        });
    };
    /**
     * Injects a message into the Glee inbound middleware chain.
     *
     * @param {GleeMessage} message The message you want to send.
     * @param {String} serverName The name of the server this message is coming from.
     * @param {GleeConnection} [connection] The connection used when receiving the message. Its type is unknown and must be handled by the adapters.
     */
    Glee.prototype.injectMessage = function (message, serverName, connection) {
        message.serverName = serverName;
        message.connection = connection;
        message.setInbound();
        this._processMessage(this._router.getMiddlewares(), this._router.getErrorMiddlewares(), message);
    };
    /**
     * Injects an error into the Glee inbound error middleware chain.
     *
     * @param {Any} error The error.
     * @param {String} [channel] The channel of the error.
     */
    Glee.prototype.injectError = function (error, channel) {
        this._processError(this._router.getErrorMiddlewares(), error, new message_js_1["default"]({ channel: channel }));
    };
    /**
     * Synchronizes the other instances in the cluster with the message.
     *
     * @param {GleeMessage} message
     */
    Glee.prototype.syncCluster = function (message) {
        var _this = this;
        if (this._clusterAdapter && !message.cluster) {
            this._clusterAdapter.instance.send(message)["catch"](function (e) {
                _this._processError(_this._router.getErrorMiddlewares(), e, message);
            });
        }
    };
    /**
     * Starts executing the middlewares for the given message.
     *
     * @param {ChannelMiddlewareTuple} middlewares The middleware chain to execute.
     * @param {ChannelErrorMiddlewareTuple} errorMiddlewares The middlewares chain to execute in case of error.
     * @param {GleeMessage} message The message to pass to the middlewares.
     * @private
     */
    Glee.prototype._processMessage = function (middlewares, errorMiddlewares, message) {
        var _this = this;
        var mws = middlewares
            .filter(function (mw) { return (0, util_js_1.matchChannel)(mw.channel, message.channel); })
            .map(function (mw) { return function (msg, next) {
            var msgForMiddleware = (0, util_js_1.duplicateMessage)(msg);
            msgForMiddleware.params = (0, util_js_1.getParams)(mw.channel, msgForMiddleware.channel);
            msgForMiddleware.on('send', function (m) {
                m.setOutbound();
                _this._processMessage(_this._router.getOutboundMiddlewares(), _this._router.getOutboundErrorMiddlewares(), m);
            });
            mw.fn.call(mw.fn, msgForMiddleware, function (err, newMessage) {
                var nextMessage = newMessage || msgForMiddleware;
                nextMessage.channel = message.channel; // This is to avoid the channel to be modified.
                next(err, nextMessage);
            });
        }; });
        async_1["default"].seq.apply(async_1["default"], mws)(message, function (err, msg) {
            if (err) {
                _this._processError(errorMiddlewares, err, msg);
                return;
            }
            if (middlewares === _this._router.getOutboundMiddlewares()) {
                debug('Outbound pipeline finished. Sending message...');
                debug(msg);
                _this._adapters.forEach(function (a) {
                    if (a.instance && (!msg.serverName || msg.serverName === a.serverName)) {
                        a.instance.send(msg)["catch"](function (e) {
                            _this._processError(errorMiddlewares, e, msg);
                        });
                    }
                });
            }
            else {
                debug('Inbound pipeline finished.');
            }
        });
    };
    /**
     * Starts executing the middlewares for the given error and message.
     *
     * @param {Array} errorMiddlewares The error middlewares chain to execute.
     * @param {Any} error The error to pass to the middleware.
     * @param {GleeMessage} message The message to pass to the middlewares.
     * @private
     */
    Glee.prototype._processError = function (errorMiddlewares, error, message) {
        var emws = errorMiddlewares.filter(function (emw) { return (0, util_js_1.matchChannel)(emw.channel, message.channel); });
        if (!emws.length)
            return;
        this._execErrorMiddleware(emws, 0, error, message);
    };
    Glee.prototype._execErrorMiddleware = function (emws, index, error, message) {
        var _this = this;
        emws.at(index).fn(error, message, function (err) {
            if (!emws[index + 1])
                return;
            _this._execErrorMiddleware.call(null, emws, index + 1, err, message);
        });
    };
    return Glee;
}(events_1["default"]));
exports["default"] = Glee;
