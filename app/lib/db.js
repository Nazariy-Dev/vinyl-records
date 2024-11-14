import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    // throw new Error(
    //     'Please define the MONGODB_URI environment variable inside .env',
    // )
    console.log('Please define the MONGODB_URI environment variable inside .env')
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            useUnifiedTopology: true,
        }
        cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
            console.log('Db connected')
            return mongoose
        })
    }
    try {
        cached.conn = await cached.promise
    } catch (e) {
        console.log(e)
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default dbConnect