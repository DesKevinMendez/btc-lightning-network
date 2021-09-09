const { authenticatedLndGrpc } = require('ln-service')


export const authLnd = ()=> {
  const { lnd } = authenticatedLndGrpc({
    cert: process.env.LND_CERT_BASE64,
    macaroon: process.env.LND_MACAROON_BASE64,
    socket: process.env.LND_GRPC_HOST,
  });

  return lnd;
}