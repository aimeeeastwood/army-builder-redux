"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/routes/units.ts
const express_1 = require("express");
const knexfile_js_1 = __importDefault(require("../db/knexfile.js"));
const knex_1 = __importDefault(require("knex"));
const router = (0, express_1.Router)();
const db = (0, knex_1.default)(knexfile_js_1.default.development);
// GET /api/v1/units
// Optional query: ?faction=OFN
router.get('/', async (req, res) => {
    const { faction } = req.query;
    try {
        let query = db('units').select('*');
        if (faction) {
            query = query.where('faction', faction);
        }
        const units = await query;
        res.json(units);
    }
    catch (error) {
        console.error('Error fetching units:', error);
        res.status(500).json({ error: 'Failed to fetch units' });
    }
});
exports.default = router;
