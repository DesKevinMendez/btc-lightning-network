const lnservice = require('ln-service');
import { FastifyRequest } from "fastify"
import { authLnd } from '../utils/authenticatedLnd'

export const info = async (request: FastifyRequest, reply: any) => {
  try {
    // obtenemos información del nodo
    const info = await lnservice.getWalletInfo({ lnd: authLnd() });
    reply.send(info);
  } catch (e) {
    console.log(e);
  }
}