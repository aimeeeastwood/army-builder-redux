import type { Knex } from 'knex'
import path from 'path'

const dbPath = path.join(__dirname, 'dev.sqlite3')

const config: Record<string, Knex.Config> = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn: any, cb: (err?: Error | null) => void) => {
        conn.run('PRAGMA foreign_keys = ON', cb)
      },
    },
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: '/app/storage/prod.sqlite3',
    },
    useNullAsDefault: true,
  },
}

export default config
