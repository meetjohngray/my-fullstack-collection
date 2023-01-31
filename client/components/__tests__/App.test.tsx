import { render, screen, waitFor } from '@testing-library/react'
// can this be part of the boilerplate? Needed to use .toBeInTheDocument, etc?
// Might require a jest set-up file
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { JoinedQuote } from '../../../models/Iquotes'
import { apiFetchQuotes } from '../../apis/apiQuotes'
import store from '../../store'

import App from '../App'

jest.mock('../../apis/apiQuotes')

const mockedApiFetchQuotes = jest.mocked(apiFetchQuotes)

const quotes: JoinedQuote[] = [
  {
    id: 4,
    text: 'He said, she said.',
    name: 'Kevin Bacon',
    author_id: 7,
  },
  {
    id: 5,
    text: 'Here we go.',
    name: 'White Snake',
    author_id: 8,
  },
  {
    id: 6,
    text: "Let's dance.",
    name: 'Kevin Bacon',
    author_id: 7,
  },
]
describe('App', () => {
  it('displays the header', async () => {
    mockedApiFetchQuotes.mockResolvedValue(Promise.resolve(quotes))
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    )

    const header = screen.getByRole('heading')
    await waitFor(() => {
      expect(header).toBeInTheDocument()
      expect(header).toHaveTextContent(/quote this/i)
    })
  })
})
