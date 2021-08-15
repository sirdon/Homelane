import mongoose from "mongoose";
const { Schema } = mongoose;
import "../routes/dbConnect.js";
const TestingSchema = new Schema({
  Date: { type: Date,required:true },
  State:{type:String,required:true},
  TotalSamples:{type:Number,required:true},
  Negative:{type:Number,default:0},
  Positive:{type:Number,default:0},
  modifiedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});
TestingSchema.index(
    {Date:1,State:1},
    {
        collation: { locale: "en", strength: 2 },
        name: "Date_1_State_1"
    }
)
export default mongoose.model("Testing", TestingSchema);
