import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchQuotes } from '../actions/quoteActions'

import Quote from './Quote'

function App() {
  const quotes = useAppSelector((reduxState) => reduxState.quotes)
  const dispatch = useAppDispatch()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    dispatch(fetchQuotes())
  }, [dispatch])

  function nextQuote() {
    setCurrent(current === quotes.length - 1 ? 0 : current + 1)
  }

  function previousQuote() {
    setCurrent(current === 0 ? quotes.length - 1 : current - 1)
  }

  return (
    <>
      <header className="header">
        <h1>My Collection</h1>
      </header>
      <section className="main">
        {quotes.map(
          (item, index) =>
            current === index && <Quote key={item.id} quote={item} />
        )}
        <div onClick={previousQuote}>⬅</div>
        <div onClick={nextQuote}>⮕</div>
      </section>
    </>
  )
}

export default App
