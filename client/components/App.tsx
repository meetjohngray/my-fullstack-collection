import { useEffect } from 'react'
import { useAppDispatch } from '../hooks'
import { fetchQuotes } from '../actions/quoteActions'

import Quotes from './Quotes'

function App() {
  
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchQuotes())
  }, [dispatch])

  return (
    <>
      <header className="header">
        <h1>Quote This</h1>
      </header>
      <Quotes />
    </>
 )
}

export default App
