import connectDb from "../../middleware/mongoose"
import product from "../../modals/product"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        for (let i = 0; i < req.body.length; i++) {
            let p = new product({
                tittle: req.body[i].tittle,
                slug: req.body[i].slug,
                desc: req.body[i].desc,
                img: req.body[i].img,
                category: req.body[i].category,
                size: req.body[i].size,
                colour: req.body[i].colour,
                price: req.body[i].price,
                availableQty: req.body[i].availableQty,

            })
            await p.save()
            res.status(200).json({ Success: "Successfully added Products to Database" })
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler);