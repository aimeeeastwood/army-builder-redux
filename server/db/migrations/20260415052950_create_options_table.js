export function up(knex) {
  return knex.schema.createTable('unit_options', (table) => {
    table.increments('id')
    table.integer('unit_id').references('id').inTable('units').onDelete('CASCADE')
    table.string('name')
    table.integer('points')
    table.integer('cost')
    table.string('description')
  })
}

export function down(knex) {
  return knex.schema.dropTable('unit_options')
}
