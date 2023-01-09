import { useState, useEffect } from 'react'
import { fetchQuotes } from '../apis/apiQuotes'
import { JoinedQuote } from '../../server/db/quotes'

import Quote from './Quote'

function App() {
  
  const [quotes, setQuotes] = useState<JoinedQuote[]>([])

  useEffect(() => {
    fetchQuotes()
      .then( res=> {
        setQuotes(res)
      })
      .catch(err => console.log(err))
  },[])
  
  return (
    <>
      <header className="header">
        <h1>My Collection</h1>
      </header>
      <section className="main">
        {quotes.map(item => (
          <Quote key = {item.id} quote = {item} />
        ))}
      </section>
    </>
  )
}

export default App
