const express = require('express')
const { ALL_UNITS } = require('../../client/apis/units')

const router = express.Router()

router.get('/', (req, res) => {
  res.json(ALL_UNITS)
})

module.exports = router
