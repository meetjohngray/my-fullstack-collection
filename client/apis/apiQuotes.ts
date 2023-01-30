import request from "superagent";
import { QuoteFormData } from "../../models/Iquotes";

function apiFetchQuotes(){
  return request
    .get('/api/v1/quotes')
    .then(res => res.body)
}

function fetchSingleQuote(id: number){
  return request
    .get(`/api/v1/quotes/${id}`)
    .then(res => res.body)
}

function fetchQuotesByAuthor(authId: number){
  return request
    .get(`/api/v1/quotes/author/${authId}`)
    .then(res => res.body)
}

function apiAddQuote(quote: QuoteFormData){
  console.log('api quote', quote)
  return request
    .post('/api/v1/addQuote')
    .send(quote)
    .then(res => res.body)
}

export { apiFetchQuotes, fetchSingleQuote, fetchQuotesByAuthor, apiAddQuote }