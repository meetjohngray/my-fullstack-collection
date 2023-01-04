import request from 'supertest'
import server from '../../server'
import { getQuotes } from '../../db/quotes'

jest.mock('../../db/quotes')

// This is to make TS happy, using a generic type
const mockGetQuotes = getQuotes as jest.MockedFunction<typeof getQuotes>

//! What's this all about?
jest.spyOn(console, 'error').mockImplementation(() => {})

beforeEach(() => {
  jest.resetAllMocks()
})

describe('get /api/v1/quotes', () => {
  it('returns an array of quotes', () => {
    mockGetQuotes.mockReturnValue(
      Promise.resolve([
        { id: 1, text: 'Do or do not', name: 'Yoda' },
        { id: 2, text: 'Judge me by my size, do you?', name: 'Yoda' },
        { id: 3, text: 'Go into the cave, you must', name: 'Yoda' },
      ])
    )
    return request(server)
      .get('/api/v1/quotes')
      .then((res) => {
        expect(res.body).toHaveLength(3)
      })
  })
  
  it('returns 500 and logs a message when error', () => {
    mockGetQuotes.mockImplementation(() => Promise.reject('Something went wrong'))
    return request(server)
      .get('/api/v1/quotes')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.body.message).toContain('Something')
      })
  })
})
