import connectDb from "../../middleware/mongoose"
import User from "../../modals/user"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res)=>{
    if(req.method == 'POST'){
        let token = req.body.token
        const user = jsonwebtoken.verify(token, process.env.SECRETJWT);        
        let dbuser = await User.findOne({email:user.email})        
        const {firstname,lastname,email,address,pincode,phone} = dbuser
        res.status(200).json({firstname,lastname,email,address,pincode,phone})
    }
    else{
        res.status(400).json({ error: "error"})
    }

}


export default connectDb(handler);