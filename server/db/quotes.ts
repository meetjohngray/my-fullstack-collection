const connection = require('./connection')

interface Quote {
  id: number
  author_id: number
  text: string
}

interface JoinedQuote extends Quote {
  name: string
}

function getQuotes(db=connection): Quote[] {
  return db('quotes')
    .join('authors', 'authors.id', 'author_id')
    .select('quotes.id as id', 'quotes.text', 'authors.name')
}


function getSingleQuote(id: number, db=connection): JoinedQuote {
  return db('quotes')
    .join('authors', 'authors.id', 'author_id')
    .where('quotes.id', id)
    .select('quotes.id as id', 'quotes.text', 'authors.name')
    .first()
}

function getQuotesByAuthor(authId: number, db=connection): JoinedQuote[] {
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