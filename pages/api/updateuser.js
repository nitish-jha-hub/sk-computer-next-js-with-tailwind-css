import connectDb from "../../middleware/mongoose"
import User from "../../modals/user"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token
        const user = jsonwebtoken.verify(token, process.env.SECRETJWT);
        let dbuser = await User.findOneAndUpdate({ email: user.email }, { firstname: req.body.name, address: req.body.address, phone: req.body.phone, pincode: req.body.pincode })
        res.status(200).json({ success: true })
    }
    else {
        res.status(400).json({ error: "error" })
    }
}
export default connectDb(handler);