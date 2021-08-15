import Covid19 from "../../model/Covid19.js";
import Testing from "../../model/Testing.js";
import Vaccine from "../../model/Vaccine.js";
import moment from "moment";
//Get date wise data api
async function getDateInfo(req, res, next) {
  try {
    let date = req.query.date || req.headers.date || req.body.date;
    if(!date) throw new Error("Please provide date");
    console.log(date)
    date = new Date(moment(date,'DD-MM-YYYY'))  //convert date string into date format
    let vaccineData = await Vaccine.find({UpdatedOn:date})      //get vaccine data
    let testingData = await Testing.find({Date:date})           //get testing data
    let covid19Data = await Covid19.find({Date:date})           //get covid19 data
    return res.status(200).send({                               //send success response if no error
        timestamp: moment().unix(),
        success: true,
        vaccineData,
        testingData,
        covid19Data
      });
  } catch (error) {                                             //catch error if occur
    return res.status(400).send({
      timestamp: moment().unix(),
      success: false,
      message: error.message,
      error,
    });
  }
}

//get state wise data api
async function getStateInfo(req, res, next) {
    try {
      let state = req.query.state || req.headers.state || req.body.state;
      if(!state) throw new Error("Please provide state");
      let vaccineData = await Vaccine.find({State:state}).sort({UpdatedOn: 1})  //get date wise sorted vaccine data 
      let testingData = await Testing.find({State:state}).sort({Date: 1})       //get date wise sorted testing data
      let covid19Data = await Covid19.find({StateOrUnionTerritory:state}).sort({Date: 1})    //get date wise sorted covid19 data
      return res.status(200).send({                                              //send success response if no error
          timestamp: moment().unix(),
          success: true,
          vaccineData,
          testingData,
          covid19Data
        }); 
    } catch (error) {                                                            //catch error if occur
      return res.status(400).send({
        timestamp: moment().unix(),
        success: false,
        message: error.message,
        error,
      });
    }
}

//get state plus date wise api
async function pinPointState(req, res, next) {
    try {
        let date = req.query.date || req.headers.date || req.body.date;
        if(!date) throw new Error("Please provide date");
        date = new Date(moment(date,'DD-MM-YYYY'))                              //convert date string into date format
      let state = req.query.state || req.headers.state || req.body.state;
      if(!state) throw new Error("Please provide state");
      let vaccineData = await Vaccine.find({State:state,UpdatedOn:date})           //get date and state wise vaccine data 
      let testingData = await Testing.find({State:state,Date:date})                 //get date and state wise testing data 
      let covid19Data = await Covid19.find({StateOrUnionTerritory:state,Date:date}) //get date and state wise covid19 data 
      return res.status(200).send({                                                 //send success response if no error
          timestamp: moment().unix(),
          success: true,
          vaccineData,
          testingData,
          covid19Data
        });
    } catch (error) {                                                               //catch error if occur
      return res.status(400).send({
        timestamp: moment().unix(),
        success: false,
        message: error.message,
        error,
      });
    }
}

//get date wise date for multiple states
async function pinPointInfo(req, res, next) {
    try {
            let date = req.query.date || req.headers.date || req.body.date;
            if(!date) throw new Error("Please provide date");
            let originalDate = date
            date = new Date(moment(date,'DD-MM-YYYY'))
            let states = req.query.states || req.headers.states || req.body.states;
            if(!states) throw new Error("Please provide state");
            states = states.split(",");                                       //split states and get state list 
            let promArray = states.map(async state=>{
                return  {                                                     //get state wise data
                    state:state,
                    date:originalDate,
                    vaccineData : await Vaccine.find({State:state,UpdatedOn:date}),
                    testingData : await Testing.find({State:state,Date:date}),
                    covid19Data : await Covid19.find({StateOrUnionTerritory:state,Date:date})
                }
            })
            Promise.all(promArray).then((data)=>{                             //resolve all promises
                return res.status(200).send({
                    timestamp: moment().unix(),
                    success: true,
                    data:data,
                });
            }).catch((err)=>{                                                    //catch error if occur
                return res.status(400).send({
                    timestamp: moment().unix(),
                    success: false,
                    message: err.message,
                    err,
                });
            })
      
    } catch (error) {
      return res.status(400).send({
        timestamp: moment().unix(),
        success: false,
        message: error.message,
        error,
      });
    }
}

export { getDateInfo, pinPointState, getStateInfo,pinPointInfo };
