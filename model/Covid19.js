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
Covid19Schema.index(
    {Date:1,StateOrUnionTerritory:1},
    {
        collation: { locale: "en", strength: 2 },
        name: "Date_1_StateOrUnionTerritory_1",
        unique: true,
    }
)

export default mongoose.model("Covid19", Covid19Schema);
