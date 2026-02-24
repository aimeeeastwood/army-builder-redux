// server/server.ts
import express = require('express')
import cors = require('cors')
import path = require('path')

// Import your routes (still using CommonJS style)
const armyRoutes = require('./routes/armyRoutes').default

const app = express()
const PORT = 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/army', armyRoutes)

// Serve static files if needed (optional)
app.use(express.static(path.join(__dirname, 'public')))

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
