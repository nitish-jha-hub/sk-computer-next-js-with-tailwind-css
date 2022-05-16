import user from "../../modals/user"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let account = await user.findOne({ "email": req.body.email })
        if (account) {
            const bytes = CryptoJS.AES.decrypt(account.password,process.env.SECRETCRYP);
            let decryptedpass = bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.email == account.email && req.body.password == decryptedpass) {
                var token = jwt.sign({ email: account.email, firstname: account.firstname },process.env.SECRETJWT, {
                    expiresIn: '1h'
                });
                res.status(200).json({ success: true, token })
            }
            else {
                res.status(200).json({ success: false, error: "Invalid login details" })
            }
        }

        else {
            res.status(400).json({ error: "This method is not allowed" })
        }
    }
}

export default connectDb(handler);