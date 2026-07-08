import { Router } from 'express';
import db from '../db/connection'

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Army list endpoint working!' });
});

export default router;
