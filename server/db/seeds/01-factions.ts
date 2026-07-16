import type { Knex } from 'knex'

export async function seed(knex: Knex) {
  await knex('factions').del()

  await knex('factions').insert([
    {
      key: 'OFN',
      name: 'Oceanic Federal Navy',
    },
    {
      key: 'CL',
      name: 'Crusaders Of The Cleansing Light',
    },
    {
      key: 'MR',
      name: 'Melanesian Resistance',
    },
  ])
}
