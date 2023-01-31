import { fetchQuotes, SET_QUOTES } from '../quoteActions'
import { apiFetchQuotes } from '../../apis/apiQuotes'
import { JoinedQuote } from '../../../models/Iquotes'

jest.spyOn(console, 'error')
jest.mock('../../apis/apiQuotes')

const fakeDispatch = jest.fn()

const mockQuotes: JoinedQuote[] = [
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

const mockApiFetchQuotes = apiFetchQuotes as jest.MockedFunction<
  typeof apiFetchQuotes
>

mockApiFetchQuotes.mockReturnValue(Promise.resolve(mockQuotes))

beforeEach(() => {
  jest.clearAllMocks()
})

// jest skip and only don't seem to be working...
describe('fetchQuotes', () => {
  it('dispatchs setQuotes with an array of quotes', () => {
    const thunkFn = fetchQuotes()
    return thunkFn(fakeDispatch, () => null as any).then(() => {
      const fakeDispatchFirstCallFirstArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchFirstCallFirstArgument.type).toBe(SET_QUOTES)
    })
  })
})
