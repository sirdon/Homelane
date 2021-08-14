import mongoose from "mongoose";
const { Schema } = mongoose;
import "../routes/dbConnect.js";
const UserSchema = new Schema({
  name: { type: String, require: true },
  userType: {
    type: String,
    default: "WEB USER",
    enum: ["ADMIN", "WEB USER", "STAFF"],
  },
  password: { type: String, require: true },
  email: { type: String, require: true },
  mobile: { type: String, default: null },
  passwordHistory: [
    {
      password: String,
      changedDate: { type: Date, default: Date.now },
    },
  ],
  isActive: { type: Boolean, default: true },
  modifiedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("User", UserSchema);
