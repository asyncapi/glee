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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var uri_templates_1 = require("uri-templates");
var connection_js_1 = require("./connection.js");
var GleeAdapter = /** @class */ (function (_super) {
    __extends(GleeAdapter, _super);
    /**
     * Instantiates a Glee adapter.
     *
     * @param {Glee} glee  A reference to the Glee app.
     * @param {String} serverName  The name of the AsyncAPI server to use for the connection.
     * @param {AsyncAPIServer} server  The AsyncAPI server to use for the connection.
     * @param {AsyncAPIDocument} parsedAsyncAPI The AsyncAPI document.
     */
    function GleeAdapter(glee, serverName, server, parsedAsyncAPI) {
        var _this = this;
        var _a;
        _this = _super.call(this) || this;
        _this._glee = glee;
        _this._serverName = serverName;
        _this._AsyncAPIServer = server;
        _this._parsedAsyncAPI = parsedAsyncAPI;
        _this._channelNames = _this._parsedAsyncAPI.channelNames();
        _this._connections = [];
        var uriTemplateValues = new Map();
        (_a = process.env.GLEE_SERVER_VARIABLES) === null || _a === void 0 ? void 0 : _a.split(',').forEach(function (t) {
            var _a = t.split(':'), localServerName = _a[0], variable = _a[1], value = _a[2];
            if (localServerName === _this._serverName)
                uriTemplateValues.set(variable, value);
        });
        _this._serverUrlExpanded = (0, uri_templates_1["default"])(_this._AsyncAPIServer.url()).fill(Object.fromEntries(uriTemplateValues.entries()));
        _this.on('error', function (err) { _this._glee.injectError(err); });
        _this.on('message', function (message, connection) {
            var conn = new connection_js_1["default"]({
                connection: connection,
                channels: _this._connections.find(function (c) { return c.rawConnection === connection; }).channels,
                serverName: serverName,
                server: server,
                parsedAsyncAPI: parsedAsyncAPI
            });
            _this._glee.injectMessage(message, serverName, conn);
        });
        function enrichEvent(ev) {
            return __assign(__assign({}, ev), {
                serverName: serverName,
                server: server
            });
        }
        function createConnection(ev) {
            var channels = ev.channels;
            if (!channels && ev.channel)
                channels = [ev.channel];
            return new connection_js_1["default"]({
                connection: ev.connection,
                channels: channels,
                serverName: serverName,
                server: server,
                parsedAsyncAPI: parsedAsyncAPI
            });
        }
        _this.on('connect', function (ev) {
            var conn = createConnection(ev);
            _this._connections.push(conn);
            _this._glee.emit('adapter:connect', enrichEvent({
                connection: conn
            }));
        });
        _this.on('server:ready', function (ev) {
            _this._glee.emit('adapter:server:ready', enrichEvent(ev));
        });
        _this.on('server:connection:open', function (ev) {
            var conn = createConnection(ev);
            _this._connections.push(conn);
            _this._glee.emit('adapter:server:connection:open', enrichEvent({
                connection: conn
            }));
        });
        _this.on('reconnect', function (ev) {
            var conn = createConnection(ev);
            _this._glee.emit('adapter:reconnect', enrichEvent({
                connection: conn
            }));
        });
        _this.on('close', function (ev) {
            var conn = createConnection(ev);
            _this._glee.emit('adapter:close', enrichEvent({
                connection: conn
            }));
        });
        return _this;
    }
    Object.defineProperty(GleeAdapter.prototype, "glee", {
        get: function () {
            return this._glee;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeAdapter.prototype, "serverName", {
        get: function () {
            return this._serverName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeAdapter.prototype, "AsyncAPIServer", {
        get: function () {
            return this._AsyncAPIServer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeAdapter.prototype, "parsedAsyncAPI", {
        get: function () {
            return this._parsedAsyncAPI;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeAdapter.prototype, "channelNames", {
        get: function () {
            return this._channelNames;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeAdapter.prototype, "connections", {
        get: function () {
            return this._connections;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeAdapter.prototype, "serverUrlExpanded", {
        get: function () {
            return this._serverUrlExpanded;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns a list of the channels a given adapter has to subscribe to.
     */
    GleeAdapter.prototype.getSubscribedChannels = function () {
        var _this = this;
        return this._channelNames
            .filter(function (channelName) {
            var channel = _this._parsedAsyncAPI.channel(channelName);
            if (!channel.hasPublish())
                return false;
            var channelServers = channel.hasServers() ? channel.servers() : channel.ext('x-servers') || _this._parsedAsyncAPI.serverNames();
            return channelServers.includes(_this._serverName);
        });
    };
    /**
     * Connects to the remote server.
     */
    GleeAdapter.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method `connect` is not implemented.');
            });
        });
    };
    /**
     * Sends a message to the remote server.
     *
     * @param {GleeMessage} message The message to send.
     */
    GleeAdapter.prototype.send = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method `send` is not implemented.');
            });
        });
    };
    return GleeAdapter;
}(events_1["default"]));
exports["default"] = GleeAdapter;
