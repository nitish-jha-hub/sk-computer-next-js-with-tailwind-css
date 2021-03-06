const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email : {type: String, required: true},
    phone : {type: String, required: true},
    orderId: {type: String, required: true},
    paymentInfo: {type: String, default: ''},
    products: {type:Object, required: true},    
    address: {type: String, required: true},
    city: {type: String},
    state: {type: String},
    pincode: {type: String, required: true},    
    amount:{type: Number, require: true},
    status: {type: String, default:'initiated', required: true},
    DeliveryStatus: {type: String, default:'Unshiped', required: true},
    transectionid: {type: String, default:" ",required: true }
  },
  {timestamps: true});

  mongoose.models= {}
  export default mongoose.model("Order",OrderSchema);