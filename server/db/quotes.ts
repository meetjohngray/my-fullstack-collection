const connection = require('./connection')

function getQuotes(db=connection){
  return db('quotes')
    .join('authors', 'authors.id', 'author_id')
    .select('quotes.id as id', 'quotes.text', 'authors.name')
}

module.exports = {
  getQuotes
}