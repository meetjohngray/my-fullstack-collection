import { render, screen, within } from '@testing-library/react'
import  user  from '@testing-library/user-event'
import '@testing-library/jest-dom'
import nock from 'nock'
import { Provider } from 'react-redux'
import store from '../../store'
import { MemoryRouter as Router } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { addQuote } from '../../actions/quoteActions'

import AddQuote from '../AddQuote'
import App from '../App'

jest.mock('../../hooks')
jest.mocked(addQuote)

const mockedUseAppDispatch = jest.mocked(useAppDispatch)

describe('<AddQuote />', () => {
  it('renders a form', () => {
    render(
      <Provider store={store}>
        <Router initialEntries={['/form']}>
          <AddQuote />
        </Router>
      </Provider>
    )
    const form = screen.getByRole('form', {  name: /add a quote/i})
    expect(form).toBeVisible()
  })

  it ('adds a quote', async () => {
     const dispatch = mockedUseAppDispatch
    // const scope = nock('http://localhost:3000')
    //   .get('/')
    //   .reply(200, [
    //     { id: 1, text: 'Hello', author: 'E.B. White' },
    //     { id: 2, text: 'world', author: 'Jill Shephard' },
    //   ])

    //   const scope2 = nock('http://localhost:3000')
    //   .post('/addQuote')
    //   .reply(200, { id: 3, text: 'Another quote', author: 'John Gray' })
      
      render(
        <Provider store={store}>
          <Router initialEntries={['/form']}>
            <AddQuote />
          </Router>
        </Provider>
      )
      const form = await screen.findByRole('form', {  name: /add a quote/i})
      // expect(scope.isDone()).toBe(true)
      expect(form).toBeInTheDocument()
      
      const quoteField = within(form).getByLabelText(/quote/i)
      const authorField = within(form).getByLabelText(/author/i)
      const submit = within(form).getByRole('button', { name: /add quote/i })
      
      user.type(quoteField, 'Another quote')
      user.type(authorField, 'John Gray')
      user.click(submit)
      // expect(dispatch).toHaveBeenCalled(addQuote({ text: 'Another quote', author: 'John Gray' }))
    })
})
