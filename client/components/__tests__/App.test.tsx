import { render, screen } from '@testing-library/react'
// can this be part of the boilerplate? Needed to use .toBeInTheDocument, etc?
// Might require a jest set-up file
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import store from'../../store'

import App from '../App'

describe('App', () => {
  it('displays the header', ()=> {
     render(
      <Provider store={store}>
        <App />
      </Provider>  
      )
  
    const header = screen.getByRole('heading')
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent( /quote this/i )
  })
})