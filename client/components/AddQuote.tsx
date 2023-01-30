import { useState, FormEvent, ChangeEvent } from 'react'
import { useAppDispatch } from '../hooks'
import { addQuote } from '../actions/quoteActions'
import { QuoteFormData } from '../../models/Iquotes'



function AddQuote() {
  const dispatch = useAppDispatch()
  const initialState: QuoteFormData = { text: '', author: '' }
  const [formData, setFormData] = useState(initialState)
  const { text, author } = formData

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    setFormData((previous) => ({...previous,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addQuote(formData))
    setFormData(initialState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="quote">Quote</label>
      <textarea
        // type="text"
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