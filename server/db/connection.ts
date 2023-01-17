import knex from 'knex'
import config from './knexfile'
const env = (process.env.NODE_ENV as keyof typeof config) || 'development'

const connection = knex(config[env])
export default connection
