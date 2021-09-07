import { FastifyInstance } from "fastify"
import { index } from './../controllers/Index'
export default (fastify: FastifyInstance, _: any, done: Function) => {
  fastify.get('/', index)
  done()
}