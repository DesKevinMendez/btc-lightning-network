import { FastifyInstance } from "fastify"
import { newCoffe, coffeList } from './../controllers/coffe'

export default (fastify: FastifyInstance, _: any, done: Function) => {
  fastify.get('/', coffeList)
  fastify.post('/', newCoffe)
  done()
}