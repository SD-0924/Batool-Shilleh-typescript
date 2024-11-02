import express, { Application } from 'express'
import imageRoutes from './api/routes/imageRoutes'
import { errorHandler } from './api/middleware/errorMiddleware'
import { logRequest } from './api/middleware/logMiddleware'

const app: Application = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(logRequest)
app.use('/api/images', imageRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
