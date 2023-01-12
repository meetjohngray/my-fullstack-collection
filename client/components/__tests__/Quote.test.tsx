import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Quote from '../Quote'

describe('<Quote />', () => {
  it('renders a quote', () => {
    const quoteData = {id: 2, text: 'Do or Do Not', name: 'yoda', author_id: 7}
    render(
        <Quote quote={quoteData} />
    )
    const text = screen.getByText( /do or do not/i )
    expect(text).toHaveTextContent( /do or do not/i )
  })
})

