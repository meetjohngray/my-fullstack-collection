import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks'

import { filterQuotes } from '../actions/quoteActions'
import Quote from './Quote'

function Quotes() {
  const dispatch = useAppDispatch()
  const { authId } = useParams()

  useEffect(() => {
    setCurrent(0)
    dispatch(filterQuotes(Number(authId))) 
  }, [dispatch, authId])

  const quotes = useAppSelector(reduxState => reduxState.quoteData.quotes)
  const filteredQuotes = useAppSelector(reduxState => reduxState.quoteData.filteredQuotes)
  const mappedQuotes = filteredQuotes.length > 0 ? filteredQuotes : quotes
  console.log(mappedQuotes)


  const [current, setCurrent] = useState(0)

  const nextQuote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCurrent(current === mappedQuotes.length - 1 ? 0 : current + 1)
  }

  const previousQuote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCurrent(current === 0 ? mappedQuotes.length - 1 : current - 1)
  }

  return (
  <section className="main">
    { mappedQuotes.map((item, index) => (
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