// Require the framework and instantiate it
import path from 'path';
const FastifySSEPlugin = require('fastify-sse');

import Fastify, { FastifyInstance, FastifyRequest } from 'fastify'
import dotenv from 'dotenv';
dotenv.config();

const fastify: FastifyInstance = Fastify({ logger: { prettyPrint: true } });

fastify.register(require('fastify-static'), {
  root: path.join(process.cwd(), 'public')
});

fastify.register(FastifySSEPlugin);

// Declare a route
fastify.get('/', async (request: FastifyRequest, reply: any) => {
  return reply.sendFile('index.html')
})

// Run the server!
export const start = async () => {
  const port = process.env.PORT || 3005;
  try {
    await fastify.listen(port)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}