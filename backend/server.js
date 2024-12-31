import express from 'express'
import dotenv from 'dotenv'
import { connectDatabase } from './config/database.js'
import productRoutes from './routes/product.route.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8088

app.use(express.json())
app.use('/api/products', productRoutes)

app.listen(port, async () => {
    await connectDatabase()
    console.log(`Server started at http://localhost:${ port }`)
})
