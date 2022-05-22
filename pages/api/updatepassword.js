import connectDb from "../../middleware/mongoose"
import User from "../../modals/user"
import jsonwebtoken from "jsonwebtoken"
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token
        const user = jsonwebtoken.verify(token, process.env.SECRETJWT);
        let dbuser = await User.findOne({ email: user.email })
        const bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.SECRETCRYP);
        let decryptedpass = bytes.toString(CryptoJS.enc.Utf8);
        if (decryptedpass == req.body.password && req.body.npassword == req.body.cpassword) {
            await User.findOneAndUpdate({ email: user.email }, { password: CryptoJS.AES.encrypt(req.body.npassword, process.env.SECRETCRYP).toString() })
            res.status(200).json({ success: true })
            return
        }
        res.status(200).json({ success: false })
    }
    else {
        res.status(400).json({ error: "error" })
    }
}
export default connectDb(handler);