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
        var ofnFaction, factionId, units, _loop_1, _i, units_1, unit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, knex('factions').where({ key: 'OFN' }).first()];
                case 1:
                    ofnFaction = _a.sent();
                    if (!ofnFaction) {
                        throw new Error('OFN faction not found');
                    }
                    factionId = ofnFaction.id;
                    return [4 /*yield*/, knex('unit_options')
                            .whereIn('unit_id', knex('units').select('id').where({ faction_id: factionId }))
                            .del()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, knex('units').where({ faction_id: 1 }).del()];
                case 3:
                    _a.sent();
                    units = [
                        // HQ
                        {
                            name: 'Marine Command Squad',
                            faction_id: factionId,
                            category: 'HQ',
                            base_size: 5,
                            max_size: 5,
                            cost_per_model: 10,
                            cc: 4,
                            bs: 4,
                            de: 2,
                            fw: 1,
                            w: 1,
                            wip: 10,
                            mov: '4-4',
                            equipment: 'M-10 Smart Carbine, Grenades, Adaptive Camo',
                            special_rules: 'Infantry, Navy',
                            options: [
                                { name: 'FAC', points: 50 },
                                { name: 'Medic', points: 2 },
                                { name: 'Hacker', points: 2 },
                            ],
                        },
                        // Troop
                        {
                            name: 'Marine Rifle Squad',
                            faction_id: factionId,
                            category: 'Troop',
                            base_size: 5,
                            max_size: 10,
                            cost_per_model: 8,
                            cc: 3,
                            bs: 4,
                            de: 2,
                            fw: 2,
                            w: 1,
                            wip: 10,
                            mov: '4-4',
                            equipment: 'M-10 Smart Carbine, Grenades, Adaptive Camo',
                            special_rules: 'Infantry, Navy',
                            options: [
                                { name: 'LMG', points: 3 },
                                { name: 'Medic', points: 2 },
                                { name: 'Hacker', points: 2 },
                            ],
                        },
                        {
                            name: 'Marine Specialist Team',
                            faction_id: factionId,
                            category: 'Troop',
                            base_size: 3,
                            max_size: 3,
                            cost_per_model: 8,
                            cc: 3,
                            bs: 4,
                            de: 2,
                            fw: 1,
                            w: 1,
                            wip: 9,
                            mov: '4-4',
                            equipment: 'M-10 Smart Carbine, Grenades, Adaptive Camo',
                            special_rules: 'Infantry, Navy',
                            options: [
                                { name: 'HMG', points: 4 },
                                { name: 'Benling', points: 6 },
                                { name: 'Guided Mortar', points: 5 },
                                { name: 'Smart Sniper Rifle', points: 4 },
                            ],
                        },
                        // Elite
                        {
                            name: 'Marine Airborne Team',
                            faction_id: factionId,
                            category: 'Elite',
                            base_size: 5,
                            max_size: 10,
                            cost_per_model: 10,
                            cc: 4,
                            bs: 4,
                            de: 3,
                            fw: 2,
                            w: 1,
                            wip: 9,
                            mov: '6-2',
                            equipment: 'Bonehammer Shotguns, Shitachi, Grenades, Adaptive Camo',
                            special_rules: 'Infantry, Navy, Airbourne, Flurry Of Blades (2)',
                            options: [{ name: 'Swap Shotguns for SMGs', points: 0 }],
                        },
                        {
                            name: 'Exo-Marine Squad',
                            faction_id: factionId,
                            category: 'Elite',
                            base_size: 3,
                            max_size: 5,
                            cost_per_model: 20,
                            cc: 3,
                            bs: 4,
                            de: 4,
                            fw: 2,
                            w: 2,
                            wip: 9,
                            mov: '6-2',
                            equipment: 'Light Machine Guns, Infrared Sensors',
                            special_rules: 'Infantry, Navy, Hackable',
                        },
                        {
                            name: 'Envoy Ranger Squad',
                            faction_id: factionId,
                            category: 'Elite',
                            base_size: 3,
                            max_size: 5,
                            cost_per_model: 26,
                            cc: 4,
                            bs: 5,
                            de: 3,
                            fw: 2,
                            w: 1,
                            wip: 10,
                            mov: '6-2',
                            equipment: 'Smart Sniper Rifles, Heavy Pistols, Shitachi, Adaptive Camo, Infra-Red Sensors, Explosive Charges, Targeting Laser',
                            special_rules: 'Infantry, Navy, Infiltrators, Ambushers, Flurry Of Blades (3)',
                        },
                        // Drones
                        {
                            name: 'Trilobite Scout Drone',
                            faction_id: factionId,
                            category: 'Drone',
                            base_size: 3,
                            max_size: 6,
                            cost_per_model: 8,
                            cc: 0,
                            bs: 3,
                            de: 0,
                            fw: 0,
                            w: 1,
                            wip: 10,
                            mov: '6-6',
                            equipment: 'Targeting Laser, Infrared Sensors, Adaptive Camo',
                            special_rules: 'Drone, Fly, Hackable',
                        },
                        {
                            name: 'Barracuda Attack Drone',
                            faction_id: factionId,
                            category: 'Drone',
                            base_size: 3,
                            max_size: 6,
                            cost_per_model: 13,
                            cc: 0,
                            bs: 3,
                            de: 1,
                            fw: 1,
                            w: 1,
                            wip: 10,
                            mov: '6-6',
                            equipment: 'M-10 Smart Carbines, Infrared Sensors, Adaptive Camo',
                            special_rules: 'Drone, Fly, Hackable',
                        },
                        {
                            name: 'Vanguard Infantry Drone',
                            faction_id: factionId,
                            category: 'Drone',
                            base_size: 5,
                            max_size: 10,
                            cost_per_model: 8,
                            cc: 2,
                            bs: 3,
                            de: 4,
                            fw: 1,
                            w: 1,
                            wip: 10,
                            mov: '4-4',
                            equipment: 'M-10 Smart Carbines',
                            special_rules: 'Drone, Hackable',
                        },
                        // Vehicles
                        {
                            name: 'Carrowary Light Support Mech',
                            faction_id: factionId,
                            category: 'Vehicle',
                            points: 115,
                            cc: 2,
                            bs: 4,
                            de: 0,
                            fw: 3,
                            w: 6,
                            str: 3,
                            wip: 9,
                            mov: '6-4',
                            equipment: '75mm Cannon, Guided Missile Pod, 25mm Gatling Cannon, Adaptive Camo, Mech Foot',
                            special_rules: 'Walker, Navy, Turret, Hackable',
                            f: 10,
                            s: 10,
                            r: 10,
                        },
                        {
                            name: 'Stingray Mech Destroyer',
                            faction_id: factionId,
                            category: 'Vehicle',
                            points: 105,
                            cc: 0,
                            bs: 4,
                            de: 0,
                            fw: 3,
                            w: 4,
                            str: 2,
                            wip: 9,
                            mov: '6-6',
                            equipment: 'Rail Gun, Adaptive Camo',
                            special_rules: 'Hovercraft, Hackable',
                            f: 12,
                            s: 10,
                            r: 10,
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
                    _a.label = 4;
                case 4:
                    if (!(_i < units_1.length)) return [3 /*break*/, 7];
                    unit = units_1[_i];
                    return [5 /*yield**/, _loop_1(unit)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [2 /*return*/];
            }
        });
    });
}
