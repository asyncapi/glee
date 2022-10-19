"use strict";
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
exports.__esModule = true;
exports.gleeMessageToFunctionEvent = exports.arrayHasDuplicates = exports.validateData = exports.matchChannel = exports.duplicateMessage = exports.getParams = void 0;
var ajv_1 = require("ajv");
var better_ajv_errors_1 = require("better-ajv-errors");
var path_to_regexp_1 = require("path-to-regexp");
var message_js_1 = require("./message.js");
/**
 * Determines if a path matches a channel, and returns the matching params and its values.
 *
 * @private
 * @param {String} path The path.
 * @param {String} channel The channel.
 */
var getParams = function (path, channel) {
    if (path === undefined)
        return {};
    var keys = [];
    var re = (0, path_to_regexp_1.pathToRegexp)(path, keys);
    var result = re.exec(channel);
    if (result === null)
        return null;
    return keys.map(function (key, index) {
        var _a;
        return (_a = {}, _a[key.name] = result[index + 1], _a);
    }).reduce(function (prev, val) { return (__assign(__assign({}, prev), val)); }, {});
};
exports.getParams = getParams;
/**
 * Duplicates a GleeMessage.
 *
 * @private
 * @param {GleeMessage} message The message to duplicate.
 * @return {GleeMessage}
 */
var duplicateMessage = function (message) {
    var newMessage = new message_js_1["default"]({
        payload: message.payload,
        headers: message.headers,
        channel: message.channel,
        serverName: message.serverName,
        connection: message.connection,
        broadcast: message.broadcast,
        cluster: message.cluster
    });
    if (message.isInbound()) {
        newMessage.setInbound();
    }
    else {
        newMessage.setOutbound();
    }
    return newMessage;
};
exports.duplicateMessage = duplicateMessage;
/**
 * Determines if a path matches a channel.
 *
 * @private
 * @param {String} path The path.
 * @param {String} channel The channel.
 * @return {Boolean}
 */
var matchChannel = function (path, channel) {
    return ((0, exports.getParams)(path, channel) !== null);
};
exports.matchChannel = matchChannel;
/**
 * Validates data against a given JSON Schema definition
 *
 * @private
 * @param {Any} data The data to validate
 * @param {Object} schema A JSON Schema definition
 * @returns Object
 */
var validateData = function (data, schema) {
    var ajv = new ajv_1["default"]({ allErrors: true, jsonPointers: true });
    var validation = ajv.compile(schema);
    var isValid = validation(data);
    var errors;
    var humanReadableError;
    if (!isValid) {
        humanReadableError = (0, better_ajv_errors_1["default"])(schema, data, validation.errors, {
            format: 'cli',
            indent: 2
        });
        errors = (0, better_ajv_errors_1["default"])(schema, data, validation.errors, {
            format: 'js'
        });
    }
    return {
        errors: errors,
        humanReadableError: humanReadableError,
        isValid: isValid
    };
};
exports.validateData = validateData;
var arrayHasDuplicates = function (array) {
    return (new Set(array)).size !== array.length;
};
exports.arrayHasDuplicates = arrayHasDuplicates;
var gleeMessageToFunctionEvent = function (message, glee) {
    return {
        payload: message.payload,
        headers: message.headers,
        channel: message.channel,
        connection: message.connection,
        serverName: message.serverName,
        glee: glee
    };
};
exports.gleeMessageToFunctionEvent = gleeMessageToFunctionEvent;
