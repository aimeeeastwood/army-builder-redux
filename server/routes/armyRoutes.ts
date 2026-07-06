import { Router, Request, Response } from 'express'

const router = Router()

// Example endpoint
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Army list endpoint working!' })
})

export default router
