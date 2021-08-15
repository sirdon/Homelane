import dotenv from "dotenv";
import moment from "moment";
import fs from 'fs'; 
import parse from 'csv-parse';
import Vaccine from "../../model/Vaccine.js";
import Covid19 from "../../model/Covid19.js";
import Testing from "../../model/Testing.js";
dotenv.config();
const vaccineHeader = {
    'Updated On':"UpdatedOn",
    'State':"State",
    'Total Doses Administered':"TotalDosesAdministered",
    'Total Sessions Conducted':"TotalSessionsConducted",
    'Total Sites ':"TotalSites",
    'First Dose Administered':"FirstDoseAdministered",
    'Second Dose Administered':"SecondDoseAdministered",
    'Male(Individuals Vaccinated)':"Male",
    'Female(Individuals Vaccinated)':"Female",
    'Transgender(Individuals Vaccinated)':"Transgender",
    'Total Covaxin Administered':"TotalCovaxinAdministered",
    'Total CoviShield Administered':"TotalCoviShieldAdministered",
    'Total Sputnik V Administered':"TotalSputnikVAdministered",
    'AEFI':"AEFI",
    '18-45 years (Age)':"years18_45",
    '45-60 years (Age)':"years45_60",
    '60+ years (Age)':"years60Plus",
    'Total Individuals Vaccinated':"TotalIndividualsVaccinated"
}
const covid19Header = {
    Sno:"Sno",
    "Date":"Date",
    Time:"Time",
    "State/UnionTerritory":"StateOrUnionTerritory",
    ConfirmedIndianNational:"ConfirmedIndianNational",
    ConfirmedForeignNational:"ConfirmedForeignNational",
    Cured:"Cured",
    Deaths:"Deaths",
    Confirmed:"Confirmed"

}
const testingHeader = {
    "Date":"Date",
    State:"State",
    TotalSamples:"TotalSamples",
    Negative:"Negative",
    Positive:"Positive"
}

export default async function (req, res, next) {
    try {
        var csvData=[];
        fs.createReadStream("public/Book3.csv")
            .pipe(parse({delimiter: ','}))
            .on('data', function(csvrow) {
                // console.log(csvrow);
                //do something with csvrow
                csvData.push(csvrow);        
            })
            .on('end',async function() {
            await uploadData(csvData,Testing,testingHeader,req,res)
            });
    } catch (err) {
        return res.status(400).send({
            timestamp: moment().unix(),
            success: false,
            message: err.message,
            err: err,
            
        });
    }
}

async function uploadData(dataSet,Model,modelHeader,req,res){
    try {
        if(dataSet && dataSet.length==0) throw new Error("Empty file");
        const header = dataSet[0]; //copy headers from dataSet
        dataSet.shift() // remove headers from dataSet
        let promArr = dataSet.map(async data=>{
            let obj = {};
            header.map((head,idx)=>{
                if(modelHeader[head]=="UpdatedOn" || modelHeader[head]=="Date" ){
                    obj[modelHeader[head]]=new Date(moment(data[idx],'DD-MM-YYYY'))
                }else if(data[idx]=="" || data[idx]=="-"){
                    obj[modelHeader[head]]=0;
                }else{

                    obj[modelHeader[head]]=data[idx]
                }
            })
            // console.log(obj)
            const model = new Model(obj);
            return await model.save()
        })
        Promise.all(promArr).then((info)=>{
            res.status(200).json({
                timestamp: moment().unix(),
                success: true,
                message: "data created",
                data: info.length,
            });
        }).catch((err)=>{
            res.status(400).json({
                timestamp: moment().unix(),
                success: false,
                message: err.message,
                err: err,
            });
        })

    } catch (error) {
        return res.status(400).send({
            timestamp: moment().unix(),
            success: false,
            message: err.message,
            err: err,
            
        });
    }
}