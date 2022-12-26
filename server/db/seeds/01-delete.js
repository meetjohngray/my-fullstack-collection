exports.seed = async function (knex) {
  await knex('quotes').del()
  await knex('authors').del()
}
