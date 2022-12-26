exports.up = function (knex) {
  return knex.schema.createTable('quotes', (table) => {
    table.increments('id')
    table.integer('author_id').references('authors.id')
    table.text('text')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('quotes')
}