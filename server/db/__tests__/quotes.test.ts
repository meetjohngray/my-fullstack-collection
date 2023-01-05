const knex = require('knex')
const config = require('../knexfile').test
const testDb = knex(config)
import {getQuotes, getSingleQuote, getQuotesByAuthor, type JoinedQuote} from '../../db/quotes'
const dbquote = require('../../db/data/quotes.json')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('getQuotes', () => {
  it('returns the quotes array', () => {
    return getQuotes(testDb)
      .then((quotes: JoinedQuote[]) => {
        expect(quotes).toHaveLength(dbquote.length)
        expect(quotes[0].text).toContain('Dismissing an idea')
      })
  })
})

describe('getSingleQuote', () => {
  it('returns the correct quote', () => {
    const id = 3
    return getSingleQuote(id, testDb)
      .then((quote: JoinedQuote)=> {
        expect(quote.text).toContain('things you make war with')
        expect(quote.name).toContain('Chah')
      })
  })
})

describe('getQuotesByAuthor', () => {
  it('returns all the quotes by a given author', () => {
    const authId = 28
    return getQuotesByAuthor(authId, testDb)
      .then((quotes: JoinedQuote[]) => {
        expect(quotes).toHaveLength(2)
        expect(quotes[0].text).toContain('choose to listen')
        expect(quotes[0].name).toContain('Abbey')
      })
  })
})

