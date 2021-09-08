const lnservice = require('ln-service');
import coffe from '../models/Coffe'


export const newCoffe = async (req: any, reply: any) => {
  const { lnd } = lnservice.authenticatedLndGrpc({
    cert: process.env.LND_CERT_BASE64,
    macaroon: process.env.LND_MACAROON_BASE64,
    socket: process.env.LND_GRPC_HOST,
  });
  const { name, content, tokens } = req.body;
  try {
    const invoice = await lnservice.createInvoice({
      lnd,
      tokens,
      description: name,
    });
    if (!!invoice) {
      const p = coffe.add({
        name,
        content,
        hash: invoice.id,
        request: invoice.request,
        preimage: invoice.secret,
        tokens: invoice.tokens,
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

export const coffeList = async (req: any, reply: any) => {
  const coffees = coffe.all()
  return reply.send({
    data: {
      coffees
    }
  })
}

export const payCoffe = async (req: any, reply: any) => {
  const { request } = req.body;
  const { lnd } = lnservice.authenticatedLndGrpc({
    cert: process.env.LND_CERT_BASE64,
    macaroon: process.env.LND_MACAROON_BASE64,
    socket: process.env.LND_GRPC_HOST,
  });
  try {
    const pay = await lnservice.pay({ lnd, request })

    const cof = coffe.findByRequest(request);
    coffe.paid(<string>cof?.hash)

    return reply.send({
      success: true,
      coffee: {
        ...cof,
        paid: pay.is_confirmed,
      }
    })
  } catch (error: any) {
    return reply.status(400).send({
      success: false,
      message: error[2].err.details,
    })
  }
}