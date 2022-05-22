const https = require('https')
import connectDb from "../../middleware/mongoose"
import Order from "../../modals/order"
const PaytmChecksum = require('paytmchecksum')
import Product from "../../modals/product"
import pincodes from '../../pincodes.json'

const handler = async (req, res) => {
    if (req.method == 'POST') {

        //cheak if the cart is tempered or cart is fine
        let product, sumTotal = 0;
        let cart = req.body.Cart;
        if (req.body.subTotal <= 0) {
            res.status(200).json({ success: false, "error": "Your Cart is Empty.Please build your cart" })
            return
        }
        // console.log(cart)
        for (let item in cart) {
            // console.log(item)
            sumTotal += cart[item].price * cart[item].qty
            product = await Product.findOne({ slug: item })
            // console.log(product)
            //cheak if the item in cart are out of stock
            if (product.availableQty < cart[item].qty) {
                res.status(200).json({ success: false, "error": "Some item in your cart went out of stock plz try again", cartClear: true })
                return
            }
            if (product.price != cart[item].price) {
                res.status(200).json({ success: false, "error": "The price of some item in your cart has changed", cartClear: true })
                return
            }
            if (sumTotal !== req.body.subTotal) {
                res.status(200).json({ success: false, "error": "sumtotal is not equal to subtotal", cartClear: true })
                return
            }
        }
        
        //cheak if the details are valid
        if (req.body.phone.length !== 10 || !Number.isInteger(Number(req.body.phone))) {
            res.status(200).json({ success: false, "error": "Please Enter Your 10 Digit Phone Number", cartClear: false })
            return
        }
        if (req.body.pincode.length !== 6 || !Number.isInteger(Number(req.body.pincode))) {
            res.status(200).json({ success: false, "error": "Please Enter valid Area Pincode", cartClear: false })
            return
        }        
        //cheak if the pin code is servicable or not
        if (!Object.keys(pincodes).includes(req.body.pincode)) {
            res.status(200).json({ success: false, "error": "Pincode Not Serviceable", cartClear: false })
            return
        }

        // initiate an order corresponding to this order id
        let order = new Order({
            name: req.body.name,
            email: req.body.email,
            orderId: req.body.oid,
            address: req.body.address,
            amount: req.body.subTotal,
            products: req.body.Cart,
            phone: req.body.phone
        })
        await order.save()

        // insert an entry in the orders table with status as pending
        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransection`,
            "txnAmount": {
                "value": req.body.subTotal,
                "currency": "INR",
            },
            "userInfo": {
                "custId": req.body.email,
            },
        };

        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        */
        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_KEY)

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);


        const requestAsync = async () => {
            return new Promise((resolve, reject) => {
                var options = {
                    /* for Staging */
                    hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    // hostname: 'securegw.paytm.in',
                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        // console.log('Response: ', response);
                        // response.success = true
                        //resolve(JSON.parse(response).body )
                        let ress = JSON.parse(response).body
                        ress.success = true
                        ress.cartClear = false
                        resolve(ress)
                    });
                });

                post_req.write(post_data);
                post_req.end();
            });
        }

        let myr = await requestAsync()
        res.status(200).json(myr)

    }
}
export default connectDb(handler);