const express = require('express')
const router = express.Router()

// Example endpoint
router.get('/', (req, res) => {
  res.json({ message: 'Army list endpoint working!' })
})

module.exports = router
