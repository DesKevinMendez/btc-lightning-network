import { FastifyRequest } from "fastify"

export const index = async (request: FastifyRequest, reply: any) => {
  return reply.sendFile('index.html')
}