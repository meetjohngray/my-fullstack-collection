import { SET_QUOTES, QuoteAction } from '../actions/quoteActions'
import { JoinedQuote } from '../../models/Iquotes'

const initialState: JoinedQuote[] = []

const reducer = (state = initialState, action: QuoteAction) => {
  const { type, payload } = action
  switch (type) {
    case SET_QUOTES:
      return payload
    default:
      return state
  }
}

export default reducer
