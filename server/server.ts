import express from 'express'
import cors from 'cors'
import armyRoutes from './routes/armyRoutes'
import unitsRoutes from './routes/units'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/army', armyRoutes)
app.use('/units', unitsRoutes)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
