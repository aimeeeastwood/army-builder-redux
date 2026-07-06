"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_jwt_1 = require("express-jwt");
var jwks_rsa_1 = __importDefault(require("jwks-rsa"));
// TODO: set the domain and audience (API Identifier)
var domain = 'https://';
var audience = 'https://';
var checkJwt = (0, express_jwt_1.expressjwt)({
    secret: jwks_rsa_1.default.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "".concat(domain, "/.well-known/jwks.json"),
    }),
    audience: audience,
    issuer: "".concat(domain, "/"),
    algorithms: ['RS256'],
});
exports.default = checkJwt;
