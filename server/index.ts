// Require the framework and instantiate it
import path from 'path';
const FastifySSEPlugin = require('fastify-sse');
import Fastify, { FastifyInstance } from 'fastify'
import dotenv from 'dotenv';
import routesWeb from './routes/index'
import routesApi from './routes/lnd'

export class BTCLighntning {
  fastify: FastifyInstance = Fastify({ logger: { prettyPrint: true } });

  constructor() {
    this.dotenv()
    this.registerStatic()
    this.registerPluging()
    this.routes();
  }

  private dotenv() {
    dotenv.config();
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
    this.fastify.register(routesWeb)
    this.fastify.register(routesApi, { prefix: 'api/v1/lnd' }) // api/v1/lnd/info
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