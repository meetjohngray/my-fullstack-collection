import { SET_QUOTES, FILTER_QUOTES, SINGLE_QUOTE, QuoteAction } from '../actions/quoteActions'
import { JoinedQuote } from '../../models/Iquotes'

export interface QuoteState {
  quotes: JoinedQuote[]
  // This seems wrong, but without JoinedQuote as an option, TS is not happy on line 23
  filteredQuotes: JoinedQuote[] | []
}
const initialState: QuoteState = {
  quotes: [],
  filteredQuotes: [],
}

const reducer = (state = initialState, action: QuoteAction) => {
  const { type, payload } = action
  switch (type) {
    case SET_QUOTES:
      return { ...state, quotes: payload }
    
    case FILTER_QUOTES:
      return {
        ...state,
        filteredQuotes: state.quotes.filter((quote) => quote.author_id === payload)
      }
    
      case SINGLE_QUOTE:
        console.log('reducer', payload);
        return {
          ...state,
          quotes: [...state.quotes, payload],
          filteredQuotes: [...state.quotes, payload].filter((quote) => quote.id === payload.id)
        };      
    
    default:
      return state
  }
}

export default reducer
