export async function up(knex) {
  await knex.schema.table('units', (table) => {
    table.renameColumn('type', 'category')
    table.renameColumn('s', 'str')
  })
  return knex.schema.table('units', (table) => {
    table.integer('base_size')
    table.integer('max_size')
    table.integer('cost_per_model')
    table.integer('points')
    table.integer('f')
    table.integer('s') // side armor
    table.integer('r')
    table.string('equipment')
    table.string('special_rules')
  })
}

export async function down(knex) {
  await knex.schema.table('units', (table) => {
    table.dropColumn('base_size')
    table.dropColumn('max_size')
    table.dropColumn('cost_per_model')
    table.dropColumn('points')
    table.dropColumn('f')
    table.dropColumn('s')
    table.dropColumn('r')
    table.dropColumn('equipment')
    table.dropColumn('special_rules')
  })
  return knex.schema.table('units', (table) => {
    table.renameColumn('str', 's')
    table.renameColumn('category', 'type')
  })
}
