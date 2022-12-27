const connection = require('./connection')

function getQuotes(db=connection){
  return db('quotes').select()
}

module.exports = {
  getQuotes
}