import { Router } from 'express'
import { getQuotes, getSingleQuote, getQuotesByAuthor, addQuote } from '../db/quotes'
import { JoinedQuote, QuoteFormData } from '../../models/Iquotes'

const router = Router()

router.get('/', (req, res) => {
  return getQuotes()
    .then((quotes: JoinedQuote[]) => {
      res.json(quotes)
    })
    .catch((err: unknown) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  return getSingleQuote(id)
    .then((quote: JoinedQuote) => {
      res.json(quote)
    })
    .catch((err: unknown) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.get('/author/:authId', (req, res) => {
  const authId = Number(req.params.authId)
  return getQuotesByAuthor(authId)
    .then((quotes: JoinedQuote[]) => {
      res.json(quotes)
    })
    .catch((err: unknown) => {
      if (err instanceof Error) console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post('/addQuote', (req, res) => {
  const quote: QuoteFormData = req.body
  return addQuote(quote)
    .then((quote: JoinedQuote) => {
      console.log('routes', quote)
      res.json(quote)
    })
    .catch((err: unknown) => {
      if (err instanceof Error) console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})



export default router
