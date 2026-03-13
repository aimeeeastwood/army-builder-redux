// server/routes/units.ts
import { Router } from 'express';
import knexConfig from '../db/knexfile.js';
import knex from 'knex';
const router = Router();
const db = knex(knexConfig.development);
// GET /api/v1/units
// Optional query: ?faction=OFN
router.get('/', async (req, res) => {
    const { faction } = req.query;
    try {
        let query = db('units').select('*');
        if (faction) {
            query = query.where('faction', faction);
        }
        const units = await query;
        res.json(units);
    }
    catch (error) {
        console.error('Error fetching units:', error);
        res.status(500).json({ error: 'Failed to fetch units' });
    }
});
export default router;
