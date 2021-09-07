const lnservice = require('ln-service');
import { FastifyRequest } from "fastify"

export const info = async (request: FastifyRequest, reply: any) => {
  try {
    // nos autenticamos con lnd
    const { lnd } = lnservice.authenticatedLndGrpc({
      cert: process.env.LND_CERT_BASE64,
      macaroon: process.env.LND_MACAROON_BASE64,
      socket: process.env.LND_GRPC_HOST,
    });
    // obtenemos información del nodo
    const info = await lnservice.getWalletInfo({ lnd });

    // mostramos la info en formato json
    reply.send(info);
  } catch (e) {
    console.log(e);
  }
}