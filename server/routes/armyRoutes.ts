import { Router } from 'express'

const router = Router()

// Example endpoint
router.get('/', (req, res) => {
  res.json({ message: 'Army list endpoint working!' })
})

export default router
