import mongoose from 'mongoose'

export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Database connected')
    } catch (error) {
        console.error(`Error: ${ error.message }`)
        process.exit(1)
    }
}
