"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromisedDatabase = exports.sqlite3 = void 0;
var sqlite3_1 = __importDefault(require("sqlite3"));
exports.sqlite3 = sqlite3_1.default;
var PromisedDatabase_1 = require("./PromisedDatabase");
Object.defineProperty(exports, "PromisedDatabase", { enumerable: true, get: function () { return PromisedDatabase_1.PromisedDatabase; } });
