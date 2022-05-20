import connectDb from "../../middleware/mongoose"
import Order from "../../modals/order"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    const token = req.body.token
    const data = jsonwebtoken.verify(token, process.env.SECRETJWT);
    // console.log(data)
    let orders = await Order.find({email: data.email})
    res.status(200).json({ orders })
}

export default connectDb(handler);