import { Router } from 'express'
import { getQuotes, getSingleQuote, getQuotesByAuthor, type JoinedQuote } from '../db/quotes'

const router = Router()

router.get('/', (req, res) => {
  return getQuotes()
    .then((quotes: JoinedQuote[]) => {
      res.json(quotes)
    })
    .catch((err: any) => {
      console.error(err)
      res.status(500).json({message: 'Something went wrong'})
    })  
})


router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  return getSingleQuote(id)
    .then((quote: JoinedQuote) => {
      res.json(quote)
    })
    .catch((err: any) => {
      console.error(err)
      res.status(500).json({message: 'Something went wrong'})
    })
})


export default router
