import { config } from 'dotenv'
const { parsed = {} } = config()

type Env = {
  DATABASE_URL?: string
  NODE_ENV?: 'development' | 'production'
  PORT?: string
}

export const { DATABASE_URL: databaseURL, NODE_ENV: environment, PORT: port } = parsed as Env
export const isProduction = environment === 'production'
