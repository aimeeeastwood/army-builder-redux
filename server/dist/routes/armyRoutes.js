"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Example endpoint
router.get('/', (req, res) => {
    res.json({ message: 'Army list endpoint working!' });
});
exports.default = router;
