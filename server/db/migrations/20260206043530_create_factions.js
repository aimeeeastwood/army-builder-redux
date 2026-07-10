export function up(knex) {
  return knex.schema.createTable('factions', (table) => {
    table.increments('id')
    table.string('key').unique()
    table.string('name')
  })
}

export function down(knex) {
  return knex.schema.dropTable('factions')
}
