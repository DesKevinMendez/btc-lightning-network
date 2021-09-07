import { FastifyInstance } from "fastify"
import { newCoffe, coffeList, payCoffe } from './../controllers/coffe'

export default (fastify: FastifyInstance, _: any, done: Function) => {
  fastify.get('/', coffeList)
  fastify.post('/', newCoffe)
  fastify.post('/pay', payCoffe)
  done()
}