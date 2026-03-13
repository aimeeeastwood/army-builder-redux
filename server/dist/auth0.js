"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = require("express-jwt");
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
// TODO: set the domain and audience (API Identifier)
const domain = 'https://';
const audience = 'https://';
const checkJwt = (0, express_jwt_1.expressjwt)({
    secret: jwks_rsa_1.default.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${domain}/.well-known/jwks.json`,
    }),
    audience: audience,
    issuer: `${domain}/`,
    algorithms: ['RS256'],
});
exports.default = checkJwt;
