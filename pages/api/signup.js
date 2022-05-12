import connectDb from "../../middleware/mongoose"
import user from "../../modals/user"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body);
        let u = new user (req.body)  
        
        await u.save()
        res.status(200).json({ Success: "Success" })

    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler);