import { useEffect } from 'react'
import { useAppDispatch } from '../hooks'
import { Routes, Route } from 'react-router-dom'

import { fetchQuotes } from '../actions/quoteActions'

import Quotes from './Quotes'
import AddQuote from './AddQuote'

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
      <Routes>
        <Route path="/" element={<Quotes />} />
        <Route path="/author/:authId" element={<Quotes />} />
        <Route path="/form" element={<AddQuote />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
