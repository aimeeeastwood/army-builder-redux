import { Router } from 'express'
import db from '../db/connection'

const router = Router()

router.get('/', async (req, res) => {
  const { faction } = req.query

  try {
    let query = db('units')
      .join('factions', 'units.faction_id', 'factions.id')
      .select(
        'units.id',
        'units.name',
        'units.category',
        'units.cc',
        'units.bs',
        'units.de',
        'units.fw',
        'units.w',
        'units.wip',
        'units.str',
        'units.mov',
        'units.base_size as baseSize',
        'units.max_size as maxSize',
        'units.cost_per_model as costPerModel',
        'units.points',
        'units.f',
        'units.s',
        'units.r',
        'units.equipment',
        'units.special_rules as specialRules',
        'factions.name as faction',
      )

    if (faction) {
      query = query.where('factions.key', faction)
    }

    const units = await query

    const unitsWithOptions = await Promise.all(
      units.map(async (unit) => {
        const options = await db('unit_options').where({ unit_id: unit.id })

        return {
          ...unit,
          availableOptions: options,
        }
      }),
    )

    res.json(unitsWithOptions)
  } catch (error) {
    console.error('Error fetching units:', error)
    res.status(500).json({ error: 'Failed to fetch units' })
  }
})

export default router
