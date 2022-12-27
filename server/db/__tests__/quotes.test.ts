const knex = require('knex')
const config = require('../knexfile').test
const testDb = knex(config)

const db = require('../../db/quotes')
const dbquote = require('../../db/data/quotes.json')

interface quote {
  id: string
  author_id: number
  text: string
}

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('getQuotes', () => {
  it('returns the quotes array', () => {
    return db.getQuotes(testDb)
      .then((quotes: quote[]) => {
        expect(quotes).toHaveLength(dbquote.length)
        expect(quotes[0].text).toContain('Dismissing an idea')
      })
  })
})

