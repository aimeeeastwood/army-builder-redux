"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
function seed(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var clFaction, factionId, units, _loop_1, _i, units_1, unit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, knex('factions').where({ key: 'CL' }).first()];
                case 1:
                    clFaction = _a.sent();
                    if (!clFaction) {
                        throw new Error('CL faction not found');
                    }
                    factionId = clFaction.id;
                    return [4 /*yield*/, knex('unit_options')
                            .whereIn('unit_id', knex('units').select('id').where({ faction_id: factionId }))
                            .del()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, knex('units').where({ faction_id: factionId }).del()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, knex('units').where({ faction_id: factionId }).del()];
                case 4:
                    _a.sent();
                    units = [
                        // HQ
                        {
                            name: 'Crusader Clergy Squad',
                            faction_id: factionId,
                            category: 'HQ',
                            base_size: 5,
                            max_size: 5,
                            cost_per_model: 9,
                            cc: 4,
                            bs: 4,
                            de: 3,
                            fw: 3,
                            w: 1,
                            wip: 10,
                            mov: '4-4',
                            equipment: 'QBZ-110 Bullpup, Grenades',
                            special_rules: 'Infantry, Fanatic',
                            options: [
                                { name: 'Spotter', points: 50 },
                                { name: 'Priest', points: 2 },
                                { name: 'Hacker', points: 2 },
                            ],
                        },
                        // Troops
                        {
                            name: 'Crusader Rifle Squad',
                            faction_id: factionId,
                            category: 'Troop',
                            base_size: 5,
                            max_size: 10,
                            cost_per_model: 7,
                            cc: 3,
                            bs: 3,
                            de: 2,
                            fw: 1,
                            w: 1,
                            wip: 8,
                            mov: '4-4',
                            equipment: 'QBZ-110 Bullpup, Grenades',
                            special_rules: 'Infantry, Fanatic',
                            options: [
                                { name: 'LMG', points: 3 },
                                { name: 'Priest', points: 2 },
                            ],
                        },
                        {
                            name: 'Crusader Specialist Team',
                            faction_id: factionId,
                            category: 'Troop',
                            base_size: 3,
                            max_size: 3,
                            cost_per_model: 8,
                            cc: 3,
                            bs: 3,
                            de: 2,
                            fw: 1,
                            w: 1,
                            wip: 8,
                            mov: '4-4',
                            equipment: 'QBZ-110 Bullpup, Grenades',
                            special_rules: 'Infantry, Fanatic',
                            options: [
                                { name: 'HMG', points: 4 },
                                { name: 'RPG', points: 5 },
                                { name: 'Rocket Mortar', points: 5 },
                                { name: 'Hackers', points: 2 },
                            ],
                        },
                        // Elite
                        {
                            name: 'Crusader Zealot Squad',
                            faction_id: factionId,
                            category: 'Elite',
                            base_size: 5,
                            max_size: 15,
                            cost_per_model: 12,
                            cc: 4,
                            bs: 4,
                            de: 1,
                            fw: 1,
                            w: 1,
                            wip: 7,
                            mov: '6-2',
                            equipment: 'Heavy Pistols, Poison Blades',
                            special_rules: 'Infantry, Fanatic, Zealot, Ambusher',
                            options: [{ name: 'Flamethrower', points: 3 }],
                        },
                        {
                            name: 'Enhanced Crusader Squad',
                            faction_id: factionId,
                            category: 'Elite',
                            base_size: 3,
                            max_size: 5,
                            cost_per_model: 21,
                            cc: 4,
                            bs: 3,
                            de: 3,
                            fw: 3,
                            w: 2,
                            wip: 9,
                            mov: '6-2',
                            equipment: 'QBZ-100 Bullpup, Crusader Greatswords',
                            special_rules: 'Infantry, Fanatic, Zealot, Hackable, Flurry Of Blades (2)',
                        },
                        {
                            name: 'Crusader Assassin Squad',
                            faction_id: factionId,
                            category: 'Elite',
                            base_size: 3,
                            max_size: 5,
                            cost_per_model: 21,
                            cc: 5,
                            bs: 4,
                            de: 3,
                            fw: 3,
                            w: 1,
                            wip: 10,
                            mov: '6-2',
                            equipment: 'Heavy Pistols, Poison Daggers, Optical Camo',
                            special_rules: 'Infantry, Fanatic, Superior Infiltrators, Ambushers, Flurry Of Blades (2)',
                        },
                        // Drones
                        {
                            name: 'Tarantula Drone Squad',
                            faction_id: factionId,
                            category: 'Drone',
                            base_size: 3,
                            max_size: 6,
                            cost_per_model: 13,
                            cc: 3,
                            bs: 2,
                            de: 2,
                            fw: 2,
                            w: 1,
                            wip: 10,
                            mov: '4-4',
                            equipment: 'Flamethrower, Drone Blades',
                            special_rules: 'Drone, Infiltrators, Ambushers, Hackable',
                        },
                        {
                            name: 'Locust Drone Squad',
                            faction_id: factionId,
                            category: 'Drone',
                            base_size: 3,
                            max_size: 6,
                            cost_per_model: 13,
                            cc: 0,
                            bs: 0,
                            de: 2,
                            fw: 2,
                            w: 1,
                            wip: 10,
                            mov: '6-6',
                            equipment: 'Explosive Warhead',
                            special_rules: 'Drone, Fly, Hackable',
                        },
                        {
                            name: 'Berserker Drone Squad',
                            faction_id: factionId,
                            category: 'Drone',
                            base_size: 5,
                            max_size: 10,
                            cost_per_model: 15,
                            cc: 3,
                            bs: 3,
                            de: 3,
                            fw: 2,
                            w: 1,
                            wip: 10,
                            mov: '6-2',
                            equipment: 'QBZ-110 Bullpup, Drone Blade, Sonic Blaster',
                            special_rules: 'Drone, Hackable',
                        },
                        // Vehicles
                        {
                            name: 'Ezekiel Light Mech',
                            faction_id: factionId,
                            category: 'Vehicle',
                            points: 92,
                            cc: 3,
                            bs: 4,
                            de: 0,
                            fw: 3,
                            w: 6,
                            str: 3,
                            wip: 8,
                            mov: '4-4',
                            equipment: '30mm Autocannon, Flamethrower, Mech Foot',
                            special_rules: 'Walker, Turret, Fanatic, Hackable',
                            f: 12,
                            s: 12,
                            r: 10,
                        },
                        {
                            name: 'Goliath Heavy Mech',
                            faction_id: factionId,
                            category: 'Vehicle',
                            points: 110,
                            cc: 3,
                            bs: 4,
                            de: 0,
                            fw: 4,
                            w: 5,
                            str: 6,
                            wip: 9,
                            mov: '6-4',
                            equipment: 'Rail Gun, Pocket Pod, 30mm Cannon, Flamethrower',
                            special_rules: 'Walker, Turret, Fanatic, Hackable',
                            f: 14,
                            s: 12,
                            r: 12,
                        },
                    ];
                    _loop_1 = function (unit) {
                        var options, unitData, unitId, optionsWithUnitId;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    options = unit.options, unitData = __rest(unit, ["options"]);
                                    return [4 /*yield*/, knex('units').insert(unitData)];
                                case 1:
                                    unitId = (_b.sent())[0];
                                    if (!(options && options.length > 0)) return [3 /*break*/, 3];
                                    optionsWithUnitId = options.map(function (opt) { return (__assign(__assign({}, opt), { unit_id: unitId })); });
                                    return [4 /*yield*/, knex('unit_options').insert(optionsWithUnitId)];
                                case 2:
                                    _b.sent();
                                    _b.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, units_1 = units;
                    _a.label = 5;
                case 5:
                    if (!(_i < units_1.length)) return [3 /*break*/, 8];
                    unit = units_1[_i];
                    return [5 /*yield**/, _loop_1(unit)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8: return [2 /*return*/];
            }
        });
    });
}
