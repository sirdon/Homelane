import mongoose from "mongoose";
const { Schema } = mongoose;
import "../routes/dbConnect.js";
const Covid19Schema = new Schema({
  Sno:{type:Number,required:true},
  Date: { type: Date,required:true },
  Time:{type:String},
  StateOrUnionTerritory:{type:String,required:true},
  ConfirmedIndianNational:{type:Number},
  ConfirmedForeignNational:{type:Number},
  Cured:{type:Number},
  Deaths:{type:Number},
  Confirmed:{type:Number},
  modifiedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Covid19", Covid19Schema);
