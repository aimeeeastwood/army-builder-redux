export function up(knex) {
  return knex.schema.createTable('units', (table) => {
    table.increments('id')
    table.string('name')
    table.string('type') // HQ, Troop, Elite, Vehicle
    table.integer('faction_id')
    table.integer('cc')
    table.integer('bs')
    table.integer('de')
    table.integer('fw')
    table.integer('w')
    table.integer('wip')
    table.integer('s')
    table.string('mov')
  })
}

export function down(knex) {
  return knex.schema.dropTable('units')
}
