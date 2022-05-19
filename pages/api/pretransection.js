const https = require('https');
import connectDb from "../../middleware/mongoose"
import Order from "../../modals/order"
const PaytmChecksum = require('paytmchecksum');
/*
* import checksum generation utility
* You can get this utility from https://developer.paytm.com/docs/checksum/
*/
// const PaytmChecksum = require('./PaytmChecksum');

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler = async (req, res) => {
    if (req.method == 'POST') {

        //cheak if the cart is tempered or cart is fine[pending]


        //cheak if the item in cart are out of stock[pending]

        //cheak if the details are valid-- pending

        // initiate an order corresponding to this order id
        let order = new Order({
            name: req.body.name,
            email: req.body.email,
            orderId: req.body.oid,
            address: req.body.address,
            amount: req.body.subTotal,
            products: req.body.Cart
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
                        console.log('Response: ', response);
                        resolve(JSON.parse(response).body);
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