import { FastifyInstance } from "fastify"
import { info } from './../controllers/lnd'

export default (fastify: FastifyInstance, _: any, done: Function) => {
  fastify.get('/info', info)
  done()
}