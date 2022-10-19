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
var fs_1 = require("fs");
var mqtt_1 = require("mqtt");
var adapter_js_1 = require("../../lib/adapter.js");
var message_js_1 = require("../../lib/message.js");
var MqttAdapter = /** @class */ (function (_super) {
    __extends(MqttAdapter, _super);
    function MqttAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MqttAdapter.prototype.name = function () {
        return 'MQTT adapter';
    };
    MqttAdapter.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._connect()];
            });
        });
    };
    MqttAdapter.prototype.send = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._send(message)];
            });
        });
    };
    MqttAdapter.prototype._connect = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var _a, _b;
            var subscribedChannels = _this.getSubscribedChannels();
            var serverBinding = _this.AsyncAPIServer.binding('mqtt');
            var securityRequirements = (_this.AsyncAPIServer.security() || []).map(function (sec) {
                var secName = Object.keys(sec.json())[0];
                return _this.parsedAsyncAPI.components().securityScheme(secName);
            });
            var userAndPasswordSecurityReq = securityRequirements.find(function (sec) { return sec.type() === 'userPassword'; });
            var X509SecurityReq = securityRequirements.find(function (sec) { return sec.type() === 'X509'; });
            var url = new URL(_this.AsyncAPIServer.url());
            var certsConfig = (_a = process.env.GLEE_SERVER_CERTS) === null || _a === void 0 ? void 0 : _a.split(',').map(function (t) { return t.split(':'); });
            var certs = (_b = certsConfig === null || certsConfig === void 0 ? void 0 : certsConfig.filter(function (tuple) { return tuple[0] === _this.serverName; })) === null || _b === void 0 ? void 0 : _b.map(function (t) { return fs_1["default"].readFileSync(t[1]); }); // eslint-disable-line security/detect-non-literal-fs-filename
            _this.client = mqtt_1["default"].connect({
                host: url.host,
                port: url.port || (url.protocol === 'mqtt:' ? 1883 : 8883),
                protocol: url.protocol.substr(0, url.protocol.length - 1),
                clientId: serverBinding && serverBinding.clientId,
                clean: serverBinding && serverBinding.cleanSession,
                will: serverBinding && serverBinding.will && {
                    topic: serverBinding && serverBinding.lastWill && serverBinding.lastWill.topic ? serverBinding.lastWill.topic : undefined,
                    qos: serverBinding && serverBinding.lastWill && serverBinding.lastWill.qos ? serverBinding.lastWill.qos : undefined,
                    payload: serverBinding && serverBinding.lastWill && serverBinding.lastWill.message ? serverBinding.lastWill.message : undefined,
                    retain: serverBinding && serverBinding.lastWill && serverBinding.lastWill.retain ? serverBinding.lastWill.retain : undefined
                },
                keepalive: serverBinding && serverBinding.keepAlive,
                username: userAndPasswordSecurityReq ? process.env.GLEE_USERNAME : undefined,
                password: userAndPasswordSecurityReq ? process.env.GLEE_PASSWORD : undefined,
                ca: X509SecurityReq ? certs : undefined
            });
            _this.client.on('connect', function () {
                if (!_this.firstConnect) {
                    _this.firstConnect = true;
                    _this.emit('connect', { name: _this.name(), adapter: _this, connection: _this.client, channels: _this.channelNames });
                }
                if (Array.isArray(subscribedChannels)) {
                    subscribedChannels.forEach(function (channel) {
                        var operation = _this.parsedAsyncAPI.channel(channel).publish();
                        var binding = operation.binding('mqtt');
                        _this.client.subscribe(channel, {
                            qos: binding && binding.qos ? binding.qos : 0
                        });
                    });
                }
                resolve(_this);
            });
            _this.client.on('message', function (channel, message, mqttPacket) {
                var msg = _this._createMessage(mqttPacket);
                _this.emit('message', msg, _this.client);
            });
            _this.client.on('reconnect', function () {
                _this.emit('reconnect', {
                    connection: _this.client,
                    channels: _this.channelNames
                });
            });
            _this.client.on('close', function () {
                _this.emit('close', {
                    connection: _this.client,
                    channels: _this.channelNames
                });
            });
            _this.client.on('error', function (error) {
                _this.emit('error', error);
            });
        });
    };
    MqttAdapter.prototype._send = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var operation = _this.parsedAsyncAPI.channel(message.channel).subscribe();
            var binding = operation ? operation.binding('mqtt') : undefined;
            _this.client.publish(message.channel, message.payload, {
                qos: binding && binding.qos ? binding.qos : 2,
                retain: binding && binding.retain ? binding.retain : false
            }, function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    };
    MqttAdapter.prototype._createMessage = function (packet) {
        var headers = {
            cmd: packet.cmd,
            retain: packet.retain,
            qos: packet.qos,
            dup: packet.dup,
            length: packet.length
        };
        return new message_js_1["default"]({
            payload: packet.payload,
            headers: headers,
            channel: packet.topic
        });
    };
    return MqttAdapter;
}(adapter_js_1["default"]));
exports["default"] = MqttAdapter;
