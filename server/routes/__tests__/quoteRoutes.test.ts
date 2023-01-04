import request from 'supertest'
import server from '../../server'
const db = require('../../db/quotes')

jest.mock('../../db/quotes')
jest.spyOn(console, 'error').mockImplementation(() => {})

beforeEach(() => {
  jest.resetAllMocks()
})

it('test works', () => {
  expect(1).toBeTruthy()
})

describe('get /quotes', () => {
  it('returns an array of quotes', () => {
    db.getQuotes.mockReturnValue(
      Promise.resolve([
        { id: 1, text: 'Do or do not', name: 'Yoda' },
        { id: 2, text: 'Judge me by my size', name: 'Yoda' },
        { id: 3, text: 'Go into the cave, you must', name: 'Yoda' },
      ])
    )
    return request(server)
      .get('/api/v1/quotes')
      .then((res) => {
        expect(res.body).toHaveLength(3)
      })
  })
})
