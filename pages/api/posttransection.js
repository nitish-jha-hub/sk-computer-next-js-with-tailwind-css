// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import Order from "../../modals/order";
import product from "../../modals/product";

const handler = async (req, res) => {
  let order;
  // export default function handler(req, res) {
  // validate paytm checksum
  // Updates status into orders table ie database after checking the transection status
  if (req.body.STATUS == 'TXN_SUCCESS') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'Paid', paymentInfo: JSON.stringify(req.body) })

    let products = order.products
    for (let slug in products) {
      await product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": - products[slug].qty } })
    }
  }

  else if (req.body.STATUS == 'TXN_FAILURE') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'Txn_Failed', paymentInfo: JSON.stringify(req.body) });
  }
  else if (req.body.STATUS == 'PENDING') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'pending', paymentInfo: JSON.stringify(req.body) });
  }
  // Redirect user to order confirmation page
  // initiate shiping
  res.redirect('/order?clearCart=1&id=' + order._id, 200)
  // res.status(200).json({ body: req.body })
}

export default connectDb(handler);