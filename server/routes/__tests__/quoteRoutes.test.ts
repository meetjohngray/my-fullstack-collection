import request from 'supertest'
import server from '../../server'
import { getQuotes, getSingleQuote, getQuotesByAuthor, addQuote } from '../../db/quotes'
import { Knex } from 'knex'

jest.mock('../../db/quotes')

// This is to make TS happy, using a generic type
const mockGetQuotes = getQuotes as jest.MockedFunction<typeof getQuotes>
const mockGetSingleQuotes = getSingleQuote as jest.MockedFunction<
  typeof getSingleQuote
>
const mockGetQuotesByAuthor = getQuotesByAuthor as jest.MockedFunction<
  typeof getQuotesByAuthor
>
const mockaddQuote = addQuote as jest.MockedFunction<typeof addQuote>

//! What's this all about?
jest.spyOn(console, 'error').mockImplementation(() => {})

beforeEach(() => {
  jest.resetAllMocks()
})

describe('get /api/v1/quotes', () => {
  it('returns an array of quotes', () => {
    mockGetQuotes.mockReturnValue(
      Promise.resolve([
        { id: 1, text: 'Do or do not', name: 'Yoda', author_id: 1 },
        { id: 2, text: 'I am your father', name: 'Darth Vader', author_id: 2 },
        { id: 3, text: "We're doomed", name: 'C-3PO', author_id: 3 },
      ]) as Knex.QueryBuilder
    )
    return request(server)
      .get('/api/v1/quotes')
      .then((res) => {
        expect(res.body).toHaveLength(3)
      })
  })

  it('returns 500 and logs a message when error', () => {
    mockGetQuotes.mockImplementation(
      () => Promise.reject('Something went wrong') as Knex.QueryBuilder
    )
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
        id: 2,
        text: 'Judge me by my size, do you?',
        name: 'Yoda',
        author_id: 1,
      }) as Knex.QueryBuilder
    )
    return request(server)
      .get(`/api/v1/quotes/${id}`)
      .then((res) => {
        expect(res.body.name).toContain('Yoda')
      })
  })

  it('returns 500 and logs a message when error', () => {
    mockGetQuotes.mockImplementation(
      () => Promise.reject('Something went wrong') as Knex.QueryBuilder
    )
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
        { id: 1, text: 'Do or do not', name: 'Yoda', author_id: 1 },
        {
          id: 2,
          text: 'Judge me by my size, do you?',
          name: 'Yoda',
          author_id: 1,
        },
        {
          id: 3,
          text: 'Go into the cave, you must',
          name: 'Yoda',
          author_id: 1,
        },
      ]) as Knex.QueryBuilder
    )
    return request(server)
      .get(`/api/v1/quotes/author/${authId}`)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(3)
        expect(res.body[0].text).toContain('Do or do not')
      })
  })

  it('returns 500 and logs a message when error', () => {
    mockGetQuotes.mockImplementation(
      () => Promise.reject('Something went wrong') as Knex.QueryBuilder
    )
    return request(server)
      .get('/api/v1/quotes')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.body.message).toContain('Something')
      })
  })
})

describe('post /api/v1/quotes/addQuote', () => {
  it('returns a new quote', () => {
    const newQuote = {
      text: 'This is the way',
      author: 'The Madalorian'
    }
    mockaddQuote.mockReturnValue( Promise.resolve({
      id: 19,
      text: 'This is the way',
      name: 'The Madalorian',
      author_id: 7,
    }) as Knex.QueryBuilder)

    return request(server)
      .post('/api/v1/quotes/addQuote')
      .send(newQuote)
      .then((res) => {
        expect(res.status).toBe(200)
      })
    })
})