"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var dbPath = path_1.default.join(__dirname, 'dev.sqlite3');
var config = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: dbPath,
        },
        useNullAsDefault: true,
        pool: {
            afterCreate: function (conn, cb) {
                conn.run('PRAGMA foreign_keys = ON', cb);
            },
        },
    },
    test: {
        client: 'sqlite3',
        connection: {
            filename: ':memory:',
        },
        useNullAsDefault: true,
    },
    production: {
        client: 'sqlite3',
        connection: {
            filename: '/app/storage/prod.sqlite3',
        },
        useNullAsDefault: true,
    },
};
exports.default = config;
