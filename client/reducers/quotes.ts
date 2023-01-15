import { SET_QUOTES, FILTER_QUOTES, QuoteAction } from '../actions/quoteActions'
import { JoinedQuote } from '../../models/Iquotes'

export interface InitialState {
  quotes: JoinedQuote[],
  filteredQuote: JoinedQuote | null
}
const initialState: InitialState = {
  quotes: [],
  filteredQuote: null
}  

const reducer = (state = initialState, action: QuoteAction) => {
  const { type, payload } = action
  switch (type) {
    case SET_QUOTES:
      return { ...state, quotes: payload }
    // case FILTER_QUOTES:
    //   return state.filter((quote) => quote.author_id === payload)
    //   // const filterByAuthor = (quotes, authorId: number) => {
    //   //   const authorQuotes = quotes.filter(quote => quote.author_id === authorId)
    //   //   setFilteredQuotes(authorQuotes)
    //   // }
    default:
      return state
  }
}

export default reducer
