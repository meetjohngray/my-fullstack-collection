import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import store from '../../store'
import { MemoryRouter as Router } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'

import AddQuote from '../AddQuote'

jest.mock('../../hooks')
const mockedUseAppDispatch = jest.mocked(useAppDispatch)

describe('<AddQuote />', () => {
  it('renders a form', () => {
    render(
      <Provider store={store}>
        <Router>
          <AddQuote />
        </Router>
      </Provider>
    )
    const form = screen.getByRole('form')
    expect(form).toBeVisible()
  })
})