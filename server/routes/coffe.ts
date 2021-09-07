import { FastifyInstance } from "fastify"
import { newCoffe } from './../controllers/coffe'

export default (fastify: FastifyInstance, _: any, done: Function) => {
  fastify.post('/', newCoffe)
  done()
}