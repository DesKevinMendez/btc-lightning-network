const lnservice = require('ln-service');
// const coffe = require('../models/Coffe');
import coffe from '../models/Coffe'

export const newCoffe = async (req: any, reply: any) => {
  const { lnd } = lnservice.authenticatedLndGrpc({
    cert: process.env.LND_CERT_BASE64,
    macaroon: process.env.LND_MACAROON_BASE64,
    socket: process.env.LND_GRPC_HOST,
  });

  const { name, content } = req.body;
  try {
    const invoice = await lnservice.createInvoice({
      lnd,
      tokens: 1000,
      description: name,
    });
    if (!!invoice) {
      const p = coffe.add({
        name,
        content,
        hash: invoice.id,
        request: invoice.request,
        preimage: invoice.secret,
      });
      return reply.send({
        success: true,
        data: p,
      });
    }
  } catch (e) {
    return reply.send({
      success: false,
      data: {
        message: 'We could\'nt get invoice, try again.',
        error: e
      }
    })
  }
}