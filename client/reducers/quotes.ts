import { SET_QUOTES, FILTER_QUOTES, QuoteAction } from '../actions/quoteActions'
import { JoinedQuote } from '../../models/Iquotes'

export interface InitialState {
  quotes: JoinedQuote[],
  filteredQuotes: JoinedQuote | null
}
const initialState: InitialState = {
  quotes: [],
  filteredQuotes: null
}  

const reducer = (state = initialState, action: QuoteAction) => {
  const { type, payload } = action
  switch (type) {
    case SET_QUOTES:
      return { ...state, quotes: payload }
    case FILTER_QUOTES:
      return {
        ...state,
        filteredQuotes: state.quotes.filter((quote) => {
        return quote.author_id === payload ? state.filteredQuotes = quote : null
      })
    }
      // const filterByAuthor = (quotes, authorId: number) => {
      //   const authorQuotes = quotes.filter(quote => quote.author_id === authorId)
      //   setFilteredQuotes(authorQuotes)
      // }
    default:
      return state
  }
}

export default reducer
