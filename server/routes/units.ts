// server/routes/units.ts
import { Router } from 'express'
import knexConfig from '../db/knexfile.js'
import knex from 'knex'

const router = Router()
const db = knex(knexConfig.development)

const FACTION_IDS: Record<string, number> = {
  OFN: 1,
  CL: 2,
}

// GET /units
// Optional query: ?faction=OFN or ?faction=CL
router.get('/', async (req, res) => {
  const { faction } = req.query

  try {
    let query = db('units').select('*')

    if (faction) {
      const factionId = FACTION_IDS[String(faction).toUpperCase()]
      if (!factionId) {
        res.status(400).json({ error: `Unknown faction: ${faction}` })
        return
      }
      query = query.where('faction_id', factionId)
    }

    const units = await query
    res.json(units)
  } catch (error) {
    console.error('Error fetching units:', error)
    res.status(500).json({ error: 'Failed to fetch units' })
  }
})

export default router
