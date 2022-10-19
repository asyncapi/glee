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
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(_a) {
        var humanReadableError = _a.humanReadableError, errors = _a.errors;
        var _this = _super.call(this, humanReadableError) || this;
        _this._errors = errors;
        _this._details = humanReadableError;
        _this.name = 'GleeError';
        return _this;
    }
    Object.defineProperty(ValidationError.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationError.prototype, "details", {
        get: function () {
            return this._details;
        },
        enumerable: false,
        configurable: true
    });
    return ValidationError;
}(Error));
exports["default"] = ValidationError;
