"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
async function seed(knex) {
    await knex('factions').del();
    await knex('factions').insert([
        { id: 1, name: 'Oceanic Federal Navy' },
        { id: 2, name: 'Crusaders Of The Cleansing Light' },
        { id: 3, name: 'Melanesian Resistance' },
    ]);
}
