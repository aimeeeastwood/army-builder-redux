import express from 'express'
import cors from 'cors'
import path from 'path'
import armyRoutes from './routes/armyRoutes' // note the .js if built from TS

const app = express()

app.use(cors())
app.use(express.json())

// Your API routes
app.use('/army', armyRoutes)

// Example: serve static files if needed
// app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
