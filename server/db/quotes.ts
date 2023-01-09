const connection = require('./connection')

function getQuotes(db=connection) {
  return db('quotes')
    .join('authors', 'authors.id', 'author_id')
    .select('quotes.id as id', 'quotes.text', 'authors.name', 'authors.id as authors_id')
}

function getSingleQuote(id: number, db=connection) {
  return db('quotes')
    .join('authors', 'authors.id', 'author_id')
    .where('quotes.id', id)
    .select('quotes.id as id', 'quotes.text', 'authors.name', 'authors.id as authors_id')
    .first()
}

function getQuotesByAuthor(authId: number, db=connection) {
  return db('quotes')
    .join('authors', 'authors.id', 'author_id')
    .where('author_id', authId)
    .select('authors.id as id', 'quotes.text', 'authors.name')
}

export {
  getQuotes,
  getSingleQuote,
  getQuotesByAuthor
}