import { Router } from 'express'
import db from '../db/connection'

const router = Router()

router.get('/', async (req, res) => {
  const { faction } = req.query

  try {
    let query = db('units').select('*')

    if (faction) {
      query = query.where('faction', faction)
    }

    const units = await query
    res.json(units)
  } catch (error) {
    console.error('Error fetching units:', error)
    res.status(500).json({ error: 'Failed to fetch units' })
  }
})

export default router
