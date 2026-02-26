// server/server.ts
const express = require('express')
const cors = require('cors')
const path = require('path')
const armyRoutes = require('./routes/armyRoutes')

const app = express()

app.use(cors())
app.use(express.json())

// Your API routes
app.use('/army', armyRoutes)

// Example: serve static files if needed
// app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
