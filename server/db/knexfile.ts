import path from 'path'
import type { Knex } from 'knex'

const dbPath = path.join(__dirname, 'dev.sqlite3')

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: dbPath,
    },
    pool: {
      afterCreate: (conn: any, cb: (err?: Error | null) => void) => {
        conn.run('PRAGMA foreign_keys = ON', cb)
      },
    },
  },
  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: ':memory:',
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
    pool: {
      afterCreate: (conn: any, cb: (err?: Error | null) => void) => {
        conn.run('PRAGMA foreign_keys = ON', cb)
      },
    },
  },
  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: '/app/storage/prod.sqlite3',
    },
    pool: {
      afterCreate: (conn: any, cb: (err?: Error | null) => void) => {
        conn.run('PRAGMA foreign_keys = ON', cb)
      },
    },
  },
}

export default knexConfig
