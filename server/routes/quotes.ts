import { Router } from 'express'
import { getQuotes, type JoinedQuote } from '../db/quotes'

const router = Router()

router.get('/', (request, response) => {
  return getQuotes()
    .then((quotes: JoinedQuote[]) => {
      response.json(quotes)
    })
    .catch((err: any) => {
      console.error(err)
      response.status(500).json({message: 'Something went wrong'})
    })  
})

export default router
