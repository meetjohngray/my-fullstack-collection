import { useState } from 'react'
import { useAppSelector } from '../hooks'

import Quote from './Quote'

function Quotes() {

  const quotes = useAppSelector(reduxState => reduxState.quoteData.quotes)
  const [current, setCurrent] = useState(0)

  const nextQuote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCurrent(current === quotes.length - 1 ? 0 : current + 1)
  }

  const previousQuote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCurrent(current === 0 ? quotes.length - 1 : current - 1)
  }

  return (
  <section className="main">
    {quotes.map((item, index) => (
      current === index && (
        <Quote key = {item.id} quote = {item} />
      )
    ))}
    <button onClick = {previousQuote}>
      ⬅
    </button>
    <button onClick={nextQuote}>
      ⮕
    </button>
  </section>
  )
}

export default Quotes