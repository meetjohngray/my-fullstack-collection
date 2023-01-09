export interface Quote {
  id: number
  author_id: number
  text: string
}

export interface JoinedQuote extends Quote {
  name: string
}