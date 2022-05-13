import connectDb from "../../middleware/mongoose"
import user from "../../modals/user"
var CryptoJS = require("crypto-js");


const handler = async (req, res) => {
    if (req.method == 'POST') {
        let {firstname, lastname , email} = req.body
        let u = new user ({firstname, lastname, email, password: CryptoJS.AES.encrypt(req.body.password, "Nitish@$#91!99").toString()})  
        await u.save()
        res.status(200).json({ Success: "Success" })
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}
export default connectDb(handler);