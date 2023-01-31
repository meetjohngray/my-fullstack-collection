import { JoinedQuote } from '../../models/Iquotes'
import { Link } from 'react-router-dom'

interface QuoteProps {
  quote: JoinedQuote
}

function Quote({ quote }: QuoteProps) {
  return (
    <blockquote>
      <p>{quote.text}</p>
      <Link to={`/author/${quote.author_id}`}>~ {quote.name}</Link>
    </blockquote>
  )
}

export default Quote
