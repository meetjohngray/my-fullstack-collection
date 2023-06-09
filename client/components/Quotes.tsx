import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks'

import { filterQuotes, fetchQuotes } from '../actions/quoteActions'
import Quote from './Quote'
import { JoinedQuote } from '../../models/Iquotes'

function Quotes() {
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()
  const { authId, quoteId } = useParams()
  
  
  useEffect(() => {
    setCurrent(0)
    if (authId != undefined || '') {
      console.log('yes', authId, quoteId)
      dispatch(filterQuotes(Number(authId)))
    } else if (quoteId){
      console.log('no', authId, quoteId)
      return
    } else {
      dispatch(fetchQuotes())
    }
  }, [dispatch, authId, quoteId])
  

  const quotes = useAppSelector((reduxState) => reduxState.quoteData.quotes)
  const filteredQuotes = useAppSelector(
    (reduxState) => reduxState.quoteData.filteredQuotes
  )
  
  const mappedQuotes: JoinedQuote[] = filteredQuotes.length > 0 ? filteredQuotes : quotes

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
      {loading && <p>Loading...</p>}
      {!loading && mappedQuotes.length === 0 && <p>No quotes found.</p>}
      {!loading &&
        mappedQuotes.map(
          (item, index) =>
            current === index && <Quote key={item.id} quote={item} />
        )}
      {mappedQuotes.length > 1 && (
        <div className="quoteNav">
          <button onClick={previousQuote}>⬅</button>
          <button onClick={nextQuote}>⮕</button>
        </div>
      )}
      <ul>
        <li>{<Link to="/">Home</Link>}</li>
        <li>{<Link to="/form">Add A Quote</Link>}</li>
      </ul>
    </section>
  )
}

export default Quotes
