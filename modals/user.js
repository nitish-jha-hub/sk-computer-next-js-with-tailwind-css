const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String},
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: ''},
  password: { type: String, required: true },
  address: { type: String, default: ''},
  pincode: { type: String, default: ''},
  
},{ timestamps: true });

  export default mongoose.models.User || mongoose.model("User", UserSchema);
  // mongoose.models = {}
  // export default mongoose.model("User", UserSchema);