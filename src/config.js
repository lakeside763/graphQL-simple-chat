import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, 'variable.env') })

export const {
  APP_PORT = process.env.APP_PORT,
  NODE_ENV = process.env.NODE_ENV,

  SESS_NAME = 'sid',
  SESS_SECRET = 'ssh!secret',
  SESS_LIFETIME = 1000 * 60 * 60 * 2,

  REDIS_HOST = 'redis-17082.c12.us-east-1-4.ec2.cloud.redislabs.com',
  REDIS_PORT = 17082,
  REDIS_PASSWORD = '89A9UZGuLivyj5iVHj3cSf7uF4DdVvfT'
} = process.env

export const IN_PROD = NODE_ENV === 'production'

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  console.log(`MongoDB Connected: ${conn.connection.host}`)
}

export const MONGO_URI = process.env.MONGO_URI

export const MONGO_OPTIONS = {
  useNewUrlParser: true,
  seCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}
