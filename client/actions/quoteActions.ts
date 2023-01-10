import { apiFetchQuotes } from '../apis/apiQuotes'
import { JoinedQuote } from '../../models/Iquotes'
// Why isn't this working correctly?
import { useAppDispatch } from '../hooks'
import type { ThunkAction } from '../store'

export const SET_QUOTES = 'SET_QUOTES'

export function setQuotes(quotes: JoinedQuote[]) {
  return {
    type: SET_QUOTES,
    payload: quotes
  }
}

export function fetchQuotes(): ThunkAction {
  return (useAppDispatch) => {
    return apiFetchQuotes()
      .then(quotes => {
        useAppDispatch(setQuotes(quotes))
      })
      .catch((err: unknown) => {
        console.error(err)
      })
  }
}

export type TQuoteAction = 
  | { type: typeof SET_QUOTES, payload: JoinedQuote[]}