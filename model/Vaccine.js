import mongoose from "mongoose";
const { Schema } = mongoose;
import "../routes/dbConnect.js";
const VaccineSchema = new Schema({
    UpdatedOn: { type: Date },
    State:{type:String},
    TotalDosesAdministered:{type:Number},
    TotalSessionsConducted:{type:Number},
    TotalSites :{type:Number},
    FirstDoseAdministered:{type:Number},
    SecondDoseAdministered:{type:Number},
    Male:{type:Number},
    Female:{type:Number},
    Transgender:{type:Number},
    TotalCovaxinAdministered:{type:Number},
    TotalCoviShieldAdministered:{type:Number},
    TotalSputnikVAdministered:{type:Number,default:0},
    AEFI:{type:Number,default:0},
    years18_45:{type:Number,default:0},
    years45_60:{type:Number,default:0},
    years60Plus:{type:Number,default:0},
    TotalIndividualsVaccinated:{type:Number},
    createdAt: { type: Date, default: Date.now },
});
VaccineSchema.index(
    {UpdatedOn:1,State:1},
    {
        collation: { locale: "en", strength: 2 },
        name: "UpdatedOn_1_State_1",
        unique: true,
    }
)
export default mongoose.model("Vaccine", VaccineSchema);
