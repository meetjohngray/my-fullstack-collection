import quoteReducer, { InitialState } from '../quotes'
import { setQuotes, filterQuotes, QuoteAction } from '../../actions/quoteActions'
import { JoinedQuote } from '../../../models/Iquotes'

const initialState: InitialState = {
  quotes: [],
  filteredQuotes: null,
}

const quoteData: JoinedQuote[] = [
  {
    id: 4,
    text: 'He said, she said.',
    name: 'Kevin Bacon',
    author_id: 7,
  },
  {
    id: 5,
    text: 'Here we go.',
    name: 'White Snake',
    author_id: 8,
  },
  {
    id: 6,
    text: "Let's dance.",
    name: 'Kevin Bacon',
    author_id: 7,
  },
]

const unfilteredState: InitialState = {
  quotes: quoteData,
  filteredQuotes: [
    {
      id: 4,
      text: 'He said, she said.',
      name: 'Kevin Bacon',
      author_id: 7,
    },
    {
      id: 6,
      text: "Let's dance.",
      name: 'Kevin Bacon',
      author_id: 7,
    },
  ]
}
const filteredState: InitialState = {
  quotes: quoteData,
  filteredQuotes: [
    {
      id: 4,
      text: 'He said, she said.',
      name: 'Kevin Bacon',
      author_id: 7,
    },
    {
      id: 6,
      text: "Let's dance.",
      name: 'Kevin Bacon',
      author_id: 7,
    },
  ]
}

describe('quoteReducer', () => {
  it('SET_QUOTES returns new state', () => {
    const action: QuoteAction = setQuotes(quoteData)
    const newState = quoteReducer(initialState, action)
    expect(newState.quotes).toEqual(quoteData)
  })

  it('FILTER_QUOTES returns new state', () => {
    const action: QuoteAction = filterQuotes(7)
    const newState = quoteReducer(unfilteredState, action)
    expect(newState.filteredQuotes).toEqual(filteredState.filteredQuotes)
  })
})

