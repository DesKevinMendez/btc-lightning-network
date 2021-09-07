// Require the framework and instantiate it
const path = require('path');
const FastifySSEPlugin = require('fastify-sse');

const Fastify = require('fastify')
require('dotenv').config();

const fastify = Fastify({ logger: { prettyPrint: true } });

fastify.register(require('fastify-static'), {
  root: path.join(process.cwd(), 'public')
});

fastify.register(FastifySSEPlugin);

// Declare a route
fastify.get('/', async (request: Request, reply: any) => {
  return reply.sendFile('index.html')
})

// Run the server!
const start = async () => {
  const port = process.env.PORT || 3005;
  try {
    await fastify.listen(port)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()