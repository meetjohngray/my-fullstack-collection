import { useState, FormEvent, ChangeEvent } from 'react'
import { useAppDispatch } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { addQuote, fetchSingleQuote } from '../actions/quoteActions'
import { QuoteFormData, JoinedQuote } from '../../models/Iquotes'


function AddQuote() {
  const dispatch = useAppDispatch()
  const initialState: QuoteFormData = { text: '', author: '' }
  const [formData, setFormData] = useState(initialState)
  const { text, author } = formData
  const navigate = useNavigate()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget
    setFormData((previous) => ({ ...previous, [name]: value }))
  }



  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addQuote(formData))
      .then(data => {
        console.log('form', data)
        // dispatch(fetchSingleQuote(data.id))
        setFormData(initialState)
        navigate(`/quotes/${data.id}`) // Assuming the new quote page URL follows this format
      })
      .catch(err => console.log('form', err))
  }
  
  return (
    <form onSubmit={handleSubmit} aria-label="Add a quote">
      <label htmlFor="quote">Quote</label>
      <textarea
        id="quote"
        name="text"
        value={text}
        onChange={handleChange}
      />
      <label htmlFor="author">Author</label>
      <input
        type="text"
        id="author"
        name="author"
        value={author}
        onChange={handleChange}
      />
      <button type="submit">Add Quote</button>
    </form>
  )
}
export default AddQuote
