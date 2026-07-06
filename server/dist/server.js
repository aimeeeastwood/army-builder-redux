"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var armyRoutes_1 = __importDefault(require("./routes/armyRoutes"));
var units_1 = __importDefault(require("./routes/units"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/army', armyRoutes_1.default);
app.use('/units', units_1.default);
var PORT = 4000;
app.listen(PORT, function () {
    console.log("API running on http://localhost:".concat(PORT));
});
