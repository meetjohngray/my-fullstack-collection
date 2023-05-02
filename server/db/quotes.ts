import connection from './connection'
import { QuoteFormData } from '../../models/Iquotes'

function getQuotes(db = connection) {
  return db('quotes')
    .join('authors', 'authors.id', 'author_id')
    .select(
      'quotes.id as id',
      'quotes.text',
      'authors.name',
      'authors.id as author_id'
    )
}

function getSingleQuote(id: number, db = connection) {
  return db('quotes')
    .join('authors', 'authors.id', 'author_id')
    .where('quotes.id', id)
    .select(
      'quotes.id as id',
      'quotes.text',
      'authors.name',
      'authors.id as author_id'
    )
    .first()
}

function getQuotesByAuthor(authId: number, db = connection) {
  return db('quotes')
    .join('authors', 'authors.id', 'author_id')
    .where('author_id', authId)
    .select('authors.id as id', 'quotes.text', 'authors.name')
}

function getAuthor(id: number, db = connection) {
  return db('authors')
    .where('id', id)
    .first()
}

// ChatGPT implementation
async function addQuote(quoteData: QuoteFormData, db = connection) {
  try {
    let author = await db('authors')
      .where('name', quoteData.author)
      .first()

    if (!author) {
      const [id] = await db('authors').insert({ name: quoteData.author })
      author = await getAuthor(id)
    }

    const [id] = await db('quotes').insert({
      text: quoteData.text,
      author_id: author.id,
    })

    const quote = await getSingleQuote(id)
    return quote
  } catch (error) {
    console.error('Error adding quote:', error)
    throw error
  }
}

// My oringal implementation
// function addQuote(quote: QuoteFormData, db = connection) {
//   return db('authors')
//     .where('name', quote.author)
//     .first()
//     .then((author) => {
//       if (author) {
//         return author
//       } else {
//         return db('authors')
//           .insert({ name: quote.author })
//           .then(([id]) => {
//             return getAuthor(id)
//           })
//       }
//     })
//     .then((author) => {
//       return db('quotes')
//         .insert({ text: quote.text, author_id: author.id })
//         .then(([id]) => getSingleQuote(id))
//     })
// }

export { getQuotes, getSingleQuote, getQuotesByAuthor, addQuote }
