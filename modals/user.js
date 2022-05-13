const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // confirmpassword: {type: String, required: true}
},{ timestamps: true });

  export default mongoose.models.User || mongoose.model("User", UserSchema);
  // mongoose.models = {}
  // export default mongoose.model("User", UserSchema);