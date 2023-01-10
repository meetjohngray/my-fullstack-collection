import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchQuotes } from '../actions/quoteActions'
import { JoinedQuote } from '../../models/Iquotes'

import Quote from './Quote'

function App() {
  
  const quotes = useAppSelector(reduxState => reduxState.quotes)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchQuotes())
  }, [])
  
  return (
    <>
      <header className="header">
        <h1>My Collection</h1>
      </header>
      <section className="main">
        {quotes.map((item: JoinedQuote) => (
          <Quote key = {item.id} quote = {item} />
        ))}
      </section>
    </>
  )
}

export default App
