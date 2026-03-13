"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const armyRoutes_1 = __importDefault(require("./routes/armyRoutes")); // note the .js if built from TS
const units_1 = __importDefault(require("./routes/units"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Your API routes
app.use('/army', armyRoutes_1.default);
app.use('/units', units_1.default);
// Example: serve static files if needed
// app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
