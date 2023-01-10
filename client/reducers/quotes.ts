import { SET_QUOTES, TQuoteAction } from '../actions/quoteActions'
import { JoinedQuote } from '../../models/Iquotes'

const initialState: JoinedQuote[] = []

const reducer = (state = initialState, action: TQuoteAction) => {
  const { type, payload } = action
  switch (type) {
    case SET_QUOTES:
      return payload
    default:
      return state
  }
}

export default reducer
