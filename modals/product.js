const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    tittle: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    category: {type: String, required: true},
    size: {type: String},
    colour: {type: String},
    price: {type: String, required: true},
    availableQty: {type: String, required: true},
    
},
{timestamps:true});

  mongoose.models= {}
  export default mongoose.model("Product",ProductSchema);