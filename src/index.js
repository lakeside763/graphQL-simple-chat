import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import dotenv from 'dotenv'
import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import path from 'path'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives/'
import {
  APP_PORT, IN_PROD, connectDB, SESS_NAME, SESS_SECRET, REDIS_HOST, REDIS_PORT, SESS_LIFETIME, REDIS_PASSWORD
} from './config'

dotenv.config({ path: path.resolve(__dirname, 'variable.env') })

;(async () => {
  connectDB()

  const RedisStore = connectRedis(session)

  const client = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD
  })

  // console.log(client)

  const app = express()

  app.disable('x-powered-by')

  app.use(session({
    store: new RedisStore({ client }),
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: parseInt(SESS_LIFETIME),
      sameSite: true,
      secure: IN_PROD
    }
  }))

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: schemaDirectives,
    playground: IN_PROD ? false : {
      settings: {
        'request.credentials': 'include'
      }
    },
    context: ({ req, res }) => ({ req, res })
  })

  // console.log(new RedisStore({ client: redisClient }))

  server.applyMiddleware({ app, cors: false })

  app.listen({ port: APP_PORT }, () =>
    console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`)
  )
})()

// playground: !IN_PROD ? false : {
//   settings: {
//     'request.credentials': 'include'
//   }
// }
