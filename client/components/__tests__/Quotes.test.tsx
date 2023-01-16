import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { JoinedQuote } from '../../../models/Iquotes'
import store from'../../store'
import { useAppSelector, useAppDispatch } from '../../hooks'

import Quotes from '../Quotes'

jest.mock('../../hooks')

const mockedUseAppSelector = jest.mocked(useAppSelector)
const mockedUseAppDispatch = jest.mocked(useAppDispatch)

 const mockQuotes: JoinedQuote[] = [
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
describe('<Quotes />', () => {
  it('renders the mocked data', async () => {
    const mockDispatch = jest.fn()
    mockedUseAppSelector.mockReturnValue(mockQuotes)
    // These both work...
    // mockedUseAppDispatch.mockReturnValue(mockDispatch)
    mockedUseAppDispatch.mockReturnValue(() => mockDispatch)
    
    render(
      <Provider store={store}>
        <Router>
          <Quotes />
        </Router>  
      </Provider>
    )
    
    const elements = await screen.findByText(/he said/i)
    expect(elements).toBeVisible()
  })
  
  it.todo('renders the mocked data with a filter')
})