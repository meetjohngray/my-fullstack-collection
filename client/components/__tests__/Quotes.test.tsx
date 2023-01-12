import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider, useSelector } from 'react-redux'
import { JoinedQuote } from '../../../models/Iquotes'
import store from'../../store'
import { useAppSelector } from '../../hooks'

import Quotes from '../Quotes'

jest.mock('../../hooks')

const mockedUseAppSelector = jest.mocked(useAppSelector)

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

    mockedUseAppSelector.mockReturnValue(mockQuotes)
    render(
      <Provider store={store}>
        <Quotes />  
      </Provider>
    )
    screen.debug()
    const elements = await screen.findByText(/he said/i)
    expect(elements).toBeVisible()
  })
})