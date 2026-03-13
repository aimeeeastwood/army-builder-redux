import express from 'express'
import cors from 'cors'
import armyRoutes from './routes/armyRoutes' // note the .js if built from TS
import unitsRoutes from './routes/units'

const app = express()

app.use(cors())
app.use(express.json())

// Your API routes
app.use('/army', armyRoutes)
app.use('/units', unitsRoutes)

// Example: serve static files if needed
// app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
