import request from 'supertest'
import server from '../../server'
import { getQuotes, getSingleQuote, getQuotesByAuthor } from '../../db/quotes'

jest.mock('../../db/quotes')

// This is to make TS happy, using a generic type
const mockGetQuotes = getQuotes as jest.MockedFunction<typeof getQuotes>
const mockGetSingleQuotes = getSingleQuote as jest.MockedFunction<typeof getSingleQuote>
const mockGetQuotesByAuthor = getQuotesByAuthor as jest.MockedFunction<typeof getQuotesByAuthor>

//! What's this all about?
jest.spyOn(console, 'error').mockImplementation(() => {})

beforeEach(() => {
  jest.resetAllMocks()
})

describe('get /api/v1/quotes', () => {
  it('returns an array of quotes', () => {
    mockGetQuotes.mockReturnValue(
      Promise.resolve([
        { id: 1, text: 'Do or do not', name: 'Yoda',authors_id: 1 },
        { id: 2, text: 'I am your father', name: 'Darth Vader', authors_id: 2 },
        { id: 3, text: 'We\'re doomed', name: 'C-3PO', authors_id: 3 },
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

describe('get /api/vi/quotes/:id', () => {
  it('returns a single quote', () => {
    const id = '2'
    mockGetSingleQuotes.mockReturnValue(
      Promise.resolve({
        id: 2, text: 'Judge me by my size, do you?', name: 'Yoda', authors_id: 1
      })
    )
    return request(server)
      .get(`/api/v1/quotes/${id}`)
      .then((res) => {
        expect(res.body.name).toContain('Yoda')
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

describe('get /api/v1/quotes/author:authId', () => {
  it('returns an array of quotes from a specific author', () => {
    const authId = 1
    mockGetQuotesByAuthor.mockReturnValue(
      Promise.resolve([
        { id: 1, text: 'Do or do not', name: 'Yoda',authors_id: 1 },
        { id: 2, text: 'Judge me by my size, do you?', name: 'Yoda', authors_id: 1 },
        { id: 3, text: 'Go into the cave, you must', name: 'Yoda', authors_id: 1 },
      ])
    )
    return request(server)
      .get('/api/v1/quotes/author/1')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(3)
        expect(res.body[0].text).toContain('Do or do not')
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