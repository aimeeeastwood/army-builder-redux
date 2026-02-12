import * as express from 'express'
import * as cors from 'cors'
import * as path from 'path'
import { fileURLToPath } from 'url'

import armyRoutes from './routes/armyRoutes.js' // your own routes

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/army', armyRoutes)

// Optional: serve static files
// app.use(express.static(path.join(__dirname, "public")))
app.get('/', (req, res) => {
  res.send('Army Builder API is running!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
