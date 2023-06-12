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

export function addQuote(quoteData: QuoteFormData): ThunkAction<JoinedQuote> {
  return (dispatch) => {
    return apiAddQuote(quoteData)
      .then((quote: JoinedQuote) => {
        dispatch(fetchSingleQuote(quote))
        return quote
      })
  }
}

export type QuoteAction =
  | { type: typeof SET_QUOTES; payload: JoinedQuote[] }
  | { type: typeof FILTER_QUOTES; payload: number | string }
  | { type: typeof ADD_QUOTE, payload: JoinedQuote}
  | { type: typeof SINGLE_QUOTE, payload: JoinedQuote}
