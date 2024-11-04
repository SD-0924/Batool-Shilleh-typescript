import express, { Application } from 'express'
import imageRoutes from './api/routes/imageRoutes'
import { errorHandler } from './api/middleware/errorMiddleware'
import { logRequest } from './api/middleware/logMiddleware'

const app: Application = express()
const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use(logRequest)
app.use('/api/images', imageRoutes)
app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
export { app, server };