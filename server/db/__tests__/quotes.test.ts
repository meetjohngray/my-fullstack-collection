const knex = require('knex')
const config = require('../knexfile').test
const testDb = knex(config)

const db = require('../../db/quotes')

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
        expect(quotes).not.toHaveLength(0)
        expect(quotes[0].text).toContain('Dismissing an idea')
      })
  })
})

