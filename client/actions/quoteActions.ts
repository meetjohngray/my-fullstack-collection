import { apiFetchQuotes } from '../apis/apiQuotes'
import { JoinedQuote } from '../../models/Iquotes'
import type { ThunkAction } from '../store'

export const SET_QUOTES = 'SET_QUOTES'
export const FILTER_QUOTES = 'FILTER_QUOTES'

export function setQuotes(quotes: JoinedQuote[]): QuoteAction {
  return {
    type: SET_QUOTES,
    payload: quotes
  }
}

export function filterQuotes(authorId: number): QuoteAction {
  return {
    type: FILTER_QUOTES,
    payload: authorId
  }
}
export function fetchQuotes(): ThunkAction {
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

export type QuoteAction = 
  | { type: typeof SET_QUOTES, payload: JoinedQuote[]}
  | { type: typeof FILTER_QUOTES, payload: number | string}