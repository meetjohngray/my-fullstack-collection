import { Router } from 'express'

import { getQuotes } from '../db/quotes'

const router = Router()

router.get('/', (request, response) => {
  getQuotes()
    .then((quotes) => response.json(quotes))
    .catch((err) => console.log(err))
})

export default router
