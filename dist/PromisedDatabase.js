"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromisedDatabase = void 0;
var sqlite3_1 = __importDefault(require("sqlite3"));
var PromisedDatabase = /** @class */ (function () {
    function PromisedDatabase() {
    }
    Object.defineProperty(PromisedDatabase.prototype, "db", {
        /**
         * @returns The wrapped sqlite3.Database object.
         */
        get: function () { return this._db; },
        enumerable: false,
        configurable: true
    });
    /**
     * Instantiate the wrapped sqlite3.Database and open the database.
     * @see {@link https://github.com/mapbox/node-sqlite3/wiki/API#new-sqlite3databasefilename-mode-callback | sqlite3.Database.open} for further information.
     * @param filename - filename used to instantiate sqlite3.Database.
     * @param mode - mode used to instantiate sqlite3.Database.
     */
    PromisedDatabase.prototype.open = function (filename, mode) {
        var _this = this;
        if (mode === void 0) { mode = sqlite3_1.default.OPEN_CREATE | sqlite3_1.default.OPEN_READWRITE; }
        return new Promise(function (resolve, reject) {
            _this._db = new sqlite3_1.default.Database(filename, mode, function (err) {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    };
    /**
     * Close the database.
     * @see {@link https://github.com/mapbox/node-sqlite3/wiki/API#databaseclosecallback | sqlite3.Database.close} for further information.
     */
    PromisedDatabase.prototype.close = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this._db)
                resolve();
            else {
                _this._db.close(function (err) {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            }
        });
    };
    /**
     * Execute a sql request.<br>
     * Used for request that return nothing (eg `INSERT INTO`, `CREATE TABLE`)
     * @see {@link https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback | sqlite3.Database.run} for further information.
     * @param sql - The sql request.
     * @param params - Parameters for the request.
     */
    PromisedDatabase.prototype.run = function (sql) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            if (!_this._db)
                reject(error_dbNotOpened());
            else {
                var p = params.length === 1 ? params[0] : params;
                _this._db.run(sql, p, function (err) {
                    if (err)
                        reject(err);
                    else
                        resolve(this);
                });
            }
        });
    };
    /**
     * Execute a sql request.<br>
     * Used for request that return data. (eg `SELECT`).<br>
     * Return only the first row that match the request.
     * @see {@link https://github.com/mapbox/node-sqlite3/wiki/API#databasegetsql-param--callback | sqlite3.Database.get} for further information.
     * @param sql - The sql request.
     * @param params - Parameters for the request.
     */
    PromisedDatabase.prototype.get = function (sql) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            if (!_this._db)
                reject(error_dbNotOpened());
            else {
                var p = params.length === 1 ? params[0] : params;
                _this._db.get(sql, p, function (err, row) {
                    if (err)
                        reject(err);
                    else
                        resolve(row);
                });
            }
        });
    };
    /**
     * Execute a sql request.<br>
     * Used for request that return data. (eg `SELECT`).<br>
     * Return all rows that match the request in a array.
     * @see {@link https://github.com/mapbox/node-sqlite3/wiki/API#databaseallsql-param--callback | sqlite3.Database.all} for further information.
     * @param sql - The sql request.
     * @param params - Parameters for the request.
     */
    PromisedDatabase.prototype.all = function (sql) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            if (!_this._db)
                reject(error_dbNotOpened());
            else {
                var p = params.length === 1 ? params[0] : params;
                _this._db.all(sql, p, function (e, rows) {
                    if (e)
                        reject(e);
                    else
                        resolve(rows);
                });
            }
        });
    };
    /**
     * Execute a sql request.<br>
     * Used for request that return data. (eg `SELECT`).<br>
     * Execute the callback `cb` for each row.<br>
     * Return the number of retrieved rows.<br>
     * @see {@link https://github.com/mapbox/node-sqlite3/wiki/API#databaseeachsql-param--callback-complete | sqlite3.Database.each} for further information.
     * @param sql - The sql request.
     * @param params - Parameters for the request.
     * @param cb - A callback that take a row.
     */
    PromisedDatabase.prototype.each = function (sql, params, cb) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!(cb instanceof Function))
                reject(new TypeError("cb must be a Function."));
            if (!_this._db)
                reject(error_dbNotOpened());
            else {
                _this._db.each(sql, params, function (err, row) {
                    if (err)
                        reject(err);
                    else {
                        try {
                            cb(row);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }
                }, function (err, count) {
                    if (err)
                        reject(err);
                    else
                        resolve(count);
                });
            }
        });
    };
    /**
     * Runs all sql queries in sql argument.
     * @see {@link https://github.com/mapbox/node-sqlite3/wiki/API#databaseexecsql-callback | sqlite3.Database.exec} for further information.
     * @param sql - sql request.
     */
    PromisedDatabase.prototype.exec = function (sql) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this._db)
                reject(error_dbNotOpened());
            else {
                _this._db.exec(sql, function (err) {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            }
        });
    };
    // ===[ SHORTCUT METHODS ]===============================================================
    /**
     * Add a table to the database.<br>
     * Shortcut for `CREATE TABLE [IF NOT EXISTS] tableName (...)`.
     * @category Shortcut
     * @param tableName - name of the table to create.
     * @param ifNotExists - if set to true, add `IF NOT EXISTS` clause to the request.
     * @param cols - column definitions.
     */
    PromisedDatabase.prototype.createTable = function (tableName, ifNotExists) {
        var cols = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            cols[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var ifNotExistsClause;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ifNotExistsClause = ifNotExists ? "IF NOT EXISTS" : "";
                        return [4 /*yield*/, this.run("CREATE TABLE " + ifNotExistsClause + " " + tableName + " (" + cols.join(",") + ")")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Delete a table from the database.<br>
     * Shortcut for `DROP TABLE [IF EXISTS] tableName`.
     * @category Shortcut
     * @param tableName - name of the table.
     * @param ifExists - if set to true, add `IF EXISTS` clause to the request.
     */
    PromisedDatabase.prototype.dropTable = function (tableName, ifExists) {
        if (ifExists === void 0) { ifExists = false; }
        return __awaiter(this, void 0, void 0, function () {
            var ifExistsClause;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ifExistsClause = ifExists ? "IF EXISTS" : "";
                        return [4 /*yield*/, this.run("DROP TABLE " + ifExistsClause + " " + tableName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Insert `row`in table.<br>
     * Shortcut for `INSERT INTO tableName [(...)] VALUES (...)`.<br>
     * `row`'s keys are used for table columns in the request. (Map or Object).<br>
     * if `row` is an Array, column names are omitted in the request.
     *
     * Exemple:
     * ```typescript
     * // table foo
     * // id INTEGER PRIMARY KEY AUTOINCREMENT
     * // name TEXT
     * // age INTEGER
     *
     * await db.insert("foo", { name: "Alice", age: 20 });
     * await db.insert("foo", [50, "Bob", 32]); // Array => column names are omitted so all values must be given.
     *
     * const m = new Map().set("name", "Conan").set("age", 53);
     * await db.insert("foo", m);
     * ```
     *
     * @category Shortcut
     * @param tableName - name of table.
     * @param row - row to insert.
     */
    PromisedDatabase.prototype.insert = function (tableName, row) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "INSERT INTO " + tableName + " " + sqlInsertParseObject(row);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.run(sql)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        throw { sql: sql, error: error_1 };
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Replace or insert `row` in the table.<br>
     * Shortcut for `REPLACE INTO tableName [(...)] VALUES (...)`.
     * @see `insert` for parameters usage and exemple
     * @category Shortcut
     * @param tableName - name of table.
     * @param row - row to insert.
     */
    PromisedDatabase.prototype.replace = function (tableName, row) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "REPLACE INTO " + tableName + " " + sqlInsertParseObject(row);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.run(sql)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_2 = _a.sent();
                        throw { sql: sql, error: error_2 };
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Insert multiple rows in table.<br>
     * Shortcut for `REPLACE INTO tableName [(...)] VALUES (...),(...),...`.<br>
     * If `columnName` if `undefined` or empty, column names are omitted in the request.<br>
     * If `columnName` is defined, `culumnName`'s values are used as keys to get values from each row.<br>
     * Except if the row is an Array.<br>
     * **Warning**: if `columnName` is `undefined` or empty, use only Array in `rows`. With Object or Map, values order is not guaranteed.
     *
     * Exemple:
     * ```typescript
     * // table foo
     * // id INTEGER PRIMARY KEY AUTOINCREMENT
     * // name TEXT
     * // age INTEGER
     *
     * const a = {name: "Alice", age: 20 };
     * const b = ["Bob", 32];
     * const c = new Map().set("name", "Conan").set("age", 53);
     * await db.insertMany("foo", ["name", "age"], a, b, c);
     * ```
     * @category Shortcut
     * @param tableName - name of table.
     * @param columnNames - column names.
     * @param rows - rows to insert.
     */
    PromisedDatabase.prototype.insertMany = function (tableName, columnNames) {
        var rows = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rows[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var colNames, values, _a, rows_1, row, sql, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        colNames = "";
                        if (columnNames && columnNames.length !== 0)
                            colNames = "(" + columnNames.join(",") + ")";
                        else
                            columnNames = undefined;
                        values = [];
                        for (_a = 0, rows_1 = rows; _a < rows_1.length; _a++) {
                            row = rows_1[_a];
                            if (!Array.isArray(row))
                                row = getKeysValues(row, columnNames !== null && columnNames !== void 0 ? columnNames : undefined).values;
                            values.push("(" + row.map(sqlifyValue).join(",") + ")");
                        }
                        sql = "INSERT INTO " + tableName + " " + colNames + " VALUES " + values.join(",");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.run(sql)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        error_3 = _b.sent();
                        throw { sql: sql, error: error_3 };
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Return true if there is a row that match the `whereClause` in the table `tableName`.
     * Return false otherwise.
     *
     * Exemple:
     * ```typescript
     * // table foo
     * // id INTEGER PRIMARY KEY AUTOINCREMENT
     * // name TEXT
     * // age INTEGER
     *
     * await db.insert("foo", { name: "Alice", age: 20 });
     *
     * console.log(await db.exists("foo", "name = ?", "Alice")); // true
     * console.log(await db.exists("foo", "name = ? AND age < ?", "Alice", 30)); // true
     * console.log(await db.exists("foo", "age > ?", 30)); // false
     *
     * ```
     * @category Shortcut
     * @param tableName - Name of table.
     * @param whereClause - A sqlite where clause.
     * @param params - Parameters for the request.
     */
    PromisedDatabase.prototype.exists = function (tableName, whereClause) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var sql, res, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT EXISTS(SELECT 1 FROM " + tableName + " WHERE " + whereClause + " LIMIT 1)";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.get.apply(this, __spreadArrays([sql], params))];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res[Object.keys(res)[0]] === 1];
                    case 3:
                        error_4 = _a.sent();
                        throw { sql: sql, error: error_4 };
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return PromisedDatabase;
}());
exports.PromisedDatabase = PromisedDatabase;
// ===[ Helpers ] ====================================================================================
/** @ignore */
function error_dbNotOpened() { return new Error("The database is not open."); }
/** @ignore */
function sqlifyValue(o) {
    if (o == undefined)
        return "NULL";
    if (typeof o === "string")
        return "\"" + o + "\"";
    return o;
}
/** @ignore */
function getKeysValues(o, keys) {
    if (o instanceof Map) {
        keys = keys || Array.from(o.keys());
        var values = keys.map(function (k) { return o.get(k); });
        return { keys: keys, values: values };
    }
    else {
        keys = keys || Object.keys(o);
        var values = keys.map(function (k) { return o[k]; });
        return { keys: keys, values: values };
    }
}
/** @ignore */
function sqlInsertParseObject(row) {
    var colNames = "";
    var values = [];
    if (Array.isArray(row))
        values = row.map(sqlifyValue);
    else {
        var kv = getKeysValues(row);
        colNames = "(" + kv.keys.join(",") + ")";
        values = kv.values.map(sqlifyValue);
    }
    return colNames + " VALUES (" + values.join(",") + ")";
}
