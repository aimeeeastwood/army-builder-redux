"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.join(__dirname, 'dev.sqlite3');
const knexConfig = {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: dbPath,
        },
        pool: {
            afterCreate: (conn, cb) => {
                conn.run('PRAGMA foreign_keys = ON', cb);
            },
        },
    },
    test: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: ':memory:',
        },
        migrations: {
            directory: path_1.default.join(__dirname, 'migrations'),
        },
        seeds: {
            directory: path_1.default.join(__dirname, 'seeds'),
        },
        pool: {
            afterCreate: (conn, cb) => {
                conn.run('PRAGMA foreign_keys = ON', cb);
            },
        },
    },
    production: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: '/app/storage/prod.sqlite3',
        },
        pool: {
            afterCreate: (conn, cb) => {
                conn.run('PRAGMA foreign_keys = ON', cb);
            },
        },
    },
};
exports.default = knexConfig;
