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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var GleeRouter = /** @class */ (function () {
    /**
     * Instantiates a GleeRouter.
     */
    function GleeRouter() {
        this.middlewares = [];
        this.outboundMiddlewares = [];
        this.errorMiddlewares = [];
        this.outboundErrorMiddlewares = [];
    }
    GleeRouter.prototype.use = function (channel) {
        var _this = this;
        var middlewares = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            middlewares[_i - 1] = arguments[_i];
        }
        var mws = this.middlewaresToChannelMiddlewaresTuples.apply(this, __spreadArray([channel], middlewares, false));
        mws.forEach(function (mw) {
            if (mw.fn.length <= 2) {
                _this.addMiddlewares([mw]);
            }
            else {
                _this.addErrorMiddlewares([mw]);
            }
        });
    };
    GleeRouter.prototype.useOutbound = function (channel) {
        var _this = this;
        var middlewares = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            middlewares[_i - 1] = arguments[_i];
        }
        var mws = this.middlewaresToChannelMiddlewaresTuples.apply(this, __spreadArray([channel], middlewares, false));
        mws.forEach(function (mw) {
            if (mw.fn.length <= 2) {
                _this.addOutboundMiddlewares([mw]);
            }
            else {
                _this.addOutboundErrorMiddlewares([mw]);
            }
        });
    };
    GleeRouter.prototype.middlewaresToChannelMiddlewaresTuples = function (channel) {
        var middlewares = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            middlewares[_i - 1] = arguments[_i];
        }
        var realChannel = typeof channel === 'string' ? channel : undefined;
        var allMiddlewares = realChannel ? middlewares : [channel].concat(middlewares);
        return allMiddlewares.map(function (fn) { return ({
            channel: realChannel,
            fn: fn
        }); });
    };
    /**
     * Returns all the inbound middlewares.
     * @return {Array<ChannelMiddlewareTuple>}
     */
    GleeRouter.prototype.getMiddlewares = function () {
        return this.middlewares;
    };
    /**
     * Returns all the outbound middlewares.
     * @return {Array<ChannelMiddlewareTuple>}
     */
    GleeRouter.prototype.getOutboundMiddlewares = function () {
        return this.outboundMiddlewares;
    };
    /**
     * Returns all the inbound error middlewares.
     * @return {Array<ChannelErrorMiddlewareTuple>}
     */
    GleeRouter.prototype.getErrorMiddlewares = function () {
        return this.errorMiddlewares;
    };
    /**
     * Returns all the outbound error middlewares.
     * @return {Array<ChannelErrorMiddlewareTuple>}
     */
    GleeRouter.prototype.getOutboundErrorMiddlewares = function () {
        return this.outboundErrorMiddlewares;
    };
    /**
     * Adds a normalized middleware to a target collection.
     *
     * @param {Array<GenericChannelMiddlewareTuple>} target The target collection.
     * @param {Array<GenericChannelMiddlewareTuple>} middlewares The middlewares to add to the collection.
     * @param {String} [channel] The scope channel.
     * @private
     */
    GleeRouter.prototype._addMiddlewares = function (target, middlewares, channel) {
        middlewares.forEach(function (mw) {
            if (channel) {
                var compoundchannel = mw.channel ? "".concat(channel, "/").concat(mw.channel) : channel;
                target.push(__assign(__assign({}, mw), { channel: compoundchannel }));
            }
            else {
                target.push(mw);
            }
        });
    };
    /**
     * Adds a normalized middleware to the inbound middlewares collection.
     *
     * @param {Array<ChannelMiddlewareTuple>} middlewares The middlewares to add to the collection.
     * @param {String} [channel] The scope channel.
     */
    GleeRouter.prototype.addMiddlewares = function (middlewares, channel) {
        this._addMiddlewares(this.middlewares, middlewares, channel);
    };
    /**
     * Adds a normalized middleware to the outbound middlewares collection.
     *
     * @param {Array<ChannelMiddlewareTuple>} middlewares The middlewares to add to the collection.
     * @param {String} [channel] The scope channel.
     */
    GleeRouter.prototype.addOutboundMiddlewares = function (middlewares, channel) {
        this._addMiddlewares(this.outboundMiddlewares, middlewares, channel);
    };
    /**
     * Adds a normalized middleware to the inbound error middlewares collection.
     *
     * @param {Array<ChannelErrorMiddlewareTuple>} errorMiddlewares The middlewares to add to the collection.
     * @param {String} [channel] The scope channel.
     */
    GleeRouter.prototype.addErrorMiddlewares = function (errorMiddlewares, channel) {
        this._addMiddlewares(this.errorMiddlewares, errorMiddlewares, channel);
    };
    /**
     * Adds a normalized middleware to the outbound error middlewares collection.
     *
     * @param {Array<ChannelErrorMiddlewareTuple>} errorMiddlewares The middlewares to add to the collection.
     * @param {String} [channel] The scope channel.
     */
    GleeRouter.prototype.addOutboundErrorMiddlewares = function (errorMiddlewares, channel) {
        this._addMiddlewares(this.outboundErrorMiddlewares, errorMiddlewares, channel);
    };
    return GleeRouter;
}());
exports["default"] = GleeRouter;
