import { apiFetchQuotes } from '../apis/apiQuotes'
import { JoinedQuote } from '../../models/Iquotes'
export const SET_QUOTES = 'SET_QUOTES'


export function setQuotes(quotes: JoinedQuote[]) {
  return {
    type: SET_QUOTES,
    payload: quotes
  }
}

export function fetchQuotes() {
  return (dispatch) => {
    return apiFetchQuotes()
      .then(quotes => {
        dispatch(setQuotes(quotes))
      })
      .catch((err: unknown) => {
        console.error(err)
      })
  }
}

export type TQuoteAction = 
  | { type: SET_QUOTES, payload: JoinedQuote[]}