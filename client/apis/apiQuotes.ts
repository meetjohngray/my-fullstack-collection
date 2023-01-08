import request from "superagent";

function fetchQuotes(){
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

export { fetchQuotes, fetchSingleQuote, fetchQuotesByAuthor }