import nock from 'nock'
import { apiFetchQuotes, fetchSingleQuote, fetchQuotesByAuthor } from '../apiQuotes'
import { JoinedQuote } from '../../../models/Iquotes'

const fakeQuotes: JoinedQuote[] = [
  {
  id: 4,
  text: 'He said, she said.',
  name: 'Kevin Bacon',
  author_id: 7
  },
  {
  id: 5,
  text: 'Here we go.',
  name: 'White Snake',
  author_id: 8
  },
  {
  id: 6,
  text: 'Let\'s dance.',
  name: 'Kevin Bacon',
  author_id: 7
  }
]

describe('fetchQuotes', () => {
  const scope = nock('http://localhost')
    .get('/api/v1/quotes')
    .reply(200, fakeQuotes)

  it('returns an array of quotes', () => {
    return apiFetchQuotes()
      .then((quotes) => {
        expect(quotes).toEqual(fakeQuotes)
        expect(quotes[2].text).toContain('dance')
        expect(scope.isDone()).toBe(true)
      })
  })
})

describe('fetch single quote', () => {
  const scope = nock('http://localhost')
    .get('/api/v1/quotes/5')
    .reply(200, fakeQuotes[1])

    it('returns a single quote', () => {
      return fetchSingleQuote(5)
        .then((quote) => {
          expect(quote.name).toContain('White Snake')
          expect(scope.isDone()).toBe(true)
        })
    })
})

describe('fetch quotes by author', () => {
  const scope = nock('http://localhost')
    .get('/api/v1/quotes/author/7')
    .reply(200, [fakeQuotes[0], fakeQuotes[2]])

    it('returns quotes by author', () => {
      return fetchQuotesByAuthor(7)
        .then((quotes) => {
          expect(quotes).toHaveLength(2)
          expect(quotes[0].text).toContain('He said')
          expect(scope.isDone()).toBe(true)
        })
    })
})
