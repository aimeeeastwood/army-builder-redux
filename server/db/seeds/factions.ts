import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('factions').del()

  await knex('factions').insert([
    { id: 1, name: 'Oceanic Federal Navy' },
    { id: 2, name: 'Crusaders Of The Cleansing Light' },
    { id: 3, name: 'Melanesian Resistance' },
  ])
}
