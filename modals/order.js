const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email : {type: String, required: true},
    orderId: {type: String, required: true},
    paymentInfo: {type: String, default: ''},
    products: {type:Object, required: true},
    // products : [{
    //     productId: {type: String},
    //     quantity: {type: String, default: 1}
    // }],  change to object instead of array
    address: {type: String, required: true},
    amount:{type: Number, require: true},
    status: {type: String, default:'initiated', required: true},
    DeliveryStatus: {type: String, default:'Unshiped', required: true},
  },
  {timestamps: true});

  mongoose.models= {}
  export default mongoose.model("Order",OrderSchema);