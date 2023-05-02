import { apiFetchQuotes, apiAddQuote } from '../apis/apiQuotes'
import { JoinedQuote, QuoteFormData } from '../../models/Iquotes'
import type { ThunkAction } from '../store'

export const SET_QUOTES = 'SET_QUOTES'
export const FILTER_QUOTES = 'FILTER_QUOTES'
export const SINGLE_QUOTE = 'SINGLE_QUOTE'
export const ADD_QUOTE = 'ADD_QUOTE'

export function setQuotes(quotes: JoinedQuote[]): QuoteAction {
  return {
    type: SET_QUOTES,
    payload: quotes,
  }
}

export function filterQuotes(authorId: number): QuoteAction {
  return {
    type: FILTER_QUOTES,
    payload: authorId,
  }
}

export function fetchSingleQuote(quote: JoinedQuote): QuoteAction { 
  return {
    type: SINGLE_QUOTE,
    payload: quote
  }
}

export function fetchQuotes(): ThunkAction {
  return (dispatch) => {
    return apiFetchQuotes()
      .then((quotes) => {
        dispatch(setQuotes(quotes))
      })
      .catch((err: unknown) => {
        console.error(err)
      })
  }
}

export function addQuote(quote: QuoteFormData): ThunkAction {
  return (dispatch) => {
    return apiAddQuote(quote)
      // .then((quote) => {
      //   dispatch(fetchQuotes())
      //   return quote
      // })
      .then((quote) => {
        console.log('action id', quote)
        dispatch(fetchSingleQuote(quote))
        return quote
      })
      .catch((err: unknown) => {
        console.error(err)
      })
  }
}

export type QuoteAction =
  | { type: typeof SET_QUOTES; payload: JoinedQuote[] }
  | { type: typeof FILTER_QUOTES; payload: number | string }
  | { type: typeof ADD_QUOTE, payload: QuoteFormData}
  | { type: typeof SINGLE_QUOTE, payload: JoinedQuote}
