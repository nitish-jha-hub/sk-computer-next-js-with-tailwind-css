import connectDb from "../../middleware/mongoose";
import Order from "../../modals/order";
import product from "../../modals/product";
import PaytmChecksum from "paytmchecksum";

const handler = async (req, res) => {  
  // validate paytm checksum
  var paytmChecksum = "";
  var paytmParams = {};

  const received_data = req.body
  for (var key in received_data) {
    if (key == "CHECKSUMHASH") {
      paytmChecksum = received_data[key];
    } else {
      paytmParams[key] = received_data[key];
    }
  }

  var isValidChecksum = PaytmChecksum.verifySignature(paytmParams, process.env.PAYTM_KEY, paytmChecksum);
  if (!isValidChecksum) {
    console.log("Checksum Mismatched");
    res.status(500).send("Some Error Occurred")
    return
  }


  // export default function handler(req, res) {
  // Updates status into orders table ie database after checking the transection status
  let order;
  if (req.body.STATUS == 'TXN_SUCCESS') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'Paid', paymentInfo: JSON.stringify(req.body), transectionid: req.body.TXNID })

    let products = order.products
    for (let slug in products) {
      await product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": - products[slug].qty } })
    }
    res.redirect('/order?clearCart=1&id=' + order._id, 200)
  }

  else if (req.body.STATUS == 'TXN_FAILURE') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'Txn_Failed', paymentInfo: JSON.stringify(req.body), transectionid: req.body.TXNID });
    res.redirect('/order?id=' + order._id, 200)
  }
  else if (req.body.STATUS == 'PENDING') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'pending', paymentInfo: JSON.stringify(req.body), transectionid: req.body.TXNID });
    res.redirect('/order?id=' + order._id, 200)
  }
  // Redirect user to order confirmation page
  // initiate shiping  
  // res.status(200).json({ body: req.body })
}

export default connectDb(handler);