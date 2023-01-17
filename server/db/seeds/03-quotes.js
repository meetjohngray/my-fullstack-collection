const quotes = require('../data/quotes.json')

exports.seed = function (knex) {
    return knex('quotes').insert(quotes)
}
