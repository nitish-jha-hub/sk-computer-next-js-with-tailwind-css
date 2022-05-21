import connectDb from "../../middleware/mongoose"
import user from "../../modals/user"
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let account = await user.findOne({ "email": req.body.email })
        if (account) {
            res.status(200).json({ success: false, msg: "Account already exists" })
        }
        else {
            let { firstname, lastname, email } = req.body
            let u = new user({ firstname, lastname, email, password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRETCRYP).toString() })
            await u.save()
            res.status(200).json({ success: true, msg: "User Account created successfully" })
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}
export default connectDb(handler);