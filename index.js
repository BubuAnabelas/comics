import Fastify from 'fastify'
import routes from './routes/index.js'
const fastify = Fastify({ logger: true })

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.register(routes)

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 4000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
