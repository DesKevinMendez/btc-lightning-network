const lnservice = require('ln-service');
import coffe from '../models/Coffe'
import { authLnd } from '../utils/authenticatedLnd'

export const newCoffe = async (req: any, reply: any) => {
  const { name, content, tokens } = req.body;
  try {
    const invoice = await lnservice.createInvoice({
      lnd: authLnd(),
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
  try {
    const pay = await lnservice.pay({ lnd: authLnd(), request })

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
    let message = '';
    if (error[1] === "UnexpectedPaymentError") {
      message = error[2].err.details
    } else if (error[1] === "PaymentPathfindingFailedToFindPossibleRoute") {
      message = "Payment path finding failed to find possible route"
    }

    return reply.status(400).send({
      success: false,
      code: error[0],
      errorIdentifier: error[1],
      message,
    })
  }
}