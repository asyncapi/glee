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
var uuid_1 = require("uuid");
var message_js_1 = require("./message.js");
var util_js_1 = require("./util.js");
var glee_error_js_1 = require("../errors/glee-error.js");
var ClusterMessageSchema = {
    type: 'object',
    properties: {
        instanceId: { type: 'string' },
        payload: { type: 'string' },
        headers: {
            type: 'object',
            propertyNames: { type: 'string' },
            additionProperties: { type: 'string' }
        },
        channel: { type: 'string' },
        serverName: { type: 'string' },
        broadcast: { type: 'boolean' },
        cluster: { type: 'boolean' },
        outbound: { type: 'boolean' },
        inbound: { type: 'boolean' }
    },
    required: ['instanceId', 'payload', 'channel', 'serverName', 'broadcast'],
    additionalProperties: false
};
var GleeClusterAdapter = /** @class */ (function (_super) {
    __extends(GleeClusterAdapter, _super);
    /**
     * Instantiates a Glee Cluster adapter.
     *
     * @param {Glee} glee  A reference to the Glee app.
     */
    function GleeClusterAdapter(glee) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        _this = _super.call(this) || this;
        _this._instanceId = (0, uuid_1.v4)();
        _this._glee = glee;
        var serverName = ((_b = (_a = _this._glee.options) === null || _a === void 0 ? void 0 : _a.cluster) === null || _b === void 0 ? void 0 : _b.name) || 'cluster';
        _this._serverName = serverName;
        var url = (_d = (_c = _this._glee.options) === null || _c === void 0 ? void 0 : _c.cluster) === null || _d === void 0 ? void 0 : _d.url;
        if (!url) {
            console.log('Please provide a URL for your cluster adapter in glee.config.js');
            process.exit(1);
        }
        var uriTemplateValues = new Map();
        (_e = process.env.GLEE_SERVER_VARIABLES) === null || _e === void 0 ? void 0 : _e.split(',').forEach(function (t) {
            var _a = t.split(':'), localServerName = _a[0], variable = _a[1], value = _a[2];
            if (localServerName === _this._serverName)
                uriTemplateValues.set(variable, value);
        });
        _this._serverUrlExpanded = (0, uri_templates_1["default"])(url).fill(Object.fromEntries(uriTemplateValues.entries()));
        function genClusterEvent(ev) {
            return __assign(__assign({}, ev), { serverName: serverName });
        }
        _this.on('error', function (err) { _this._glee.injectError(err); });
        _this.on('message', function (message) {
            message.cluster = true;
            _this._glee.send(message);
        });
        _this.on('connect', function (ev) {
            _this._glee.emit('adapter:cluster:connect', genClusterEvent(ev));
        });
        _this.on('reconnect', function (ev) {
            _this._glee.emit('adapter:cluster:reconnect', genClusterEvent(ev));
        });
        _this.on('close', function (ev) {
            _this._glee.emit('adapter:cluster:close', genClusterEvent(ev));
        });
        return _this;
    }
    Object.defineProperty(GleeClusterAdapter.prototype, "glee", {
        get: function () {
            return this._glee;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeClusterAdapter.prototype, "serverName", {
        get: function () {
            return this._serverName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeClusterAdapter.prototype, "serverUrlExpanded", {
        get: function () {
            return this._serverUrlExpanded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GleeClusterAdapter.prototype, "instanceId", {
        get: function () {
            return this._instanceId;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Connects to the remote server.
     */
    GleeClusterAdapter.prototype.connect = function () {
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
    GleeClusterAdapter.prototype.send = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method `send` is not implemented.');
            });
        });
    };
    /**
     * Serialize a message into JSON.
     *
     * @param {GleeMessage} message The message to serialize.
     * @returns {String} The serialized message,
     */
    GleeClusterAdapter.prototype.serializeMessage = function (message) {
        return JSON.stringify({
            instanceId: this._instanceId,
            payload: message.payload,
            headers: message.headers,
            channel: message.channel,
            serverName: message.serverName,
            broadcast: message.broadcast,
            cluster: message.cluster,
            inbound: message.isInbound(),
            outbound: message.isOutbound()
        });
    };
    /**
     * Deserializes the serialized message.
     *
     * @param {String} serialized The serialized message
     * @returns {GleeMessage} The deserialized message.
     */
    GleeClusterAdapter.prototype.deserializeMessage = function (serialized) {
        var messageData;
        try {
            messageData = JSON.parse(serialized);
            var _a = (0, util_js_1.validateData)(messageData, ClusterMessageSchema), errors = _a.errors, humanReadableError = _a.humanReadableError, isValid = _a.isValid;
            if (!isValid) {
                throw new glee_error_js_1["default"]({ humanReadableError: humanReadableError, errors: errors });
            }
        }
        catch (e) {
            this._glee.injectError(e);
            return;
        }
        var payload = messageData.payload;
        try {
            payload = JSON.parse(messageData.payload);
        }
        catch (e) {
            // payload isn't JSON
        }
        if (messageData.instanceId === this._instanceId)
            return;
        var message = new message_js_1["default"]({
            payload: payload,
            headers: messageData.headers,
            channel: messageData.channel,
            serverName: messageData.serverName,
            broadcast: messageData.broadcast,
            cluster: messageData.cluster
        });
        if (messageData.inbound && !messageData.outbound) {
            message.setInbound();
        }
        else {
            message.setOutbound();
        }
        return message;
    };
    return GleeClusterAdapter;
}(events_1["default"]));
exports["default"] = GleeClusterAdapter;
