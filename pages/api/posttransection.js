// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose"
import Order from "../../modals/order"

const handler = async (req, res) => {
  // export default function handler(req, res) {
  // validate paytm checksum
  // Updates status into orders table ie database after checking the transection status
  if (req.body.STATUS == 'TXN_SUCCESS') {
    await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'Paid', paymentInfo: JSON.stringify(req.body) });
  }
  else if (req.body.STATUS == 'PENDING') {
    await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'pending', paymentInfo: JSON.stringify(req.body) });
  }
  // Redirect user to order confirmation page
  // initiate shiping
  res.redirect('/order', 200)
  // res.status(200).json({ body: req.body })
}

export default connectDb(handler);