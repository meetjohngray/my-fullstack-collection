import { JoinedQuote } from "../../server/db/quotes"

interface QuoteProps {
  quote: JoinedQuote
}

function Quote( {quote}: QuoteProps) {
  return (
    <blockquote>
      <p>{quote.text}</p>
      <p>~ {quote.name}</p>
    </blockquote>
  )
}


export default Quote