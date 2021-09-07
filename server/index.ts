// Require the framework and instantiate it
import path from 'path';
const FastifySSEPlugin = require('fastify-sse');

import Fastify, { FastifyInstance, FastifyRequest } from 'fastify'
import dotenv from 'dotenv';
dotenv.config();

export class BTCLighntning {
  fastify: FastifyInstance = Fastify({ logger: { prettyPrint: true } });

  constructor() {
    this.registerStatic()
    this.registerPluging()
    this.routes();
  }

  private registerStatic() {
    this.fastify.register(require('fastify-static'), {
      root: path.join(process.cwd(), 'public')
    });
  }

  private registerPluging() {
    this.fastify.register(FastifySSEPlugin);
  }

  private routes() {
    this.fastify.get('/', async (request: FastifyRequest, reply: any) => {
      return reply.sendFile('index.html')
    })
  }

  public async startServer() {
    const port = process.env.PORT || 3005;
    try {
      await this.fastify.listen(port)
    } catch (err) {
      this.fastify.log.error(err)
      process.exit(1)
    }
  }
}