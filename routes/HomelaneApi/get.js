import Covid19 from "../../model/Covid19.js";
import Testing from "../../model/Testing.js";
import Vaccine from "../../model/Vaccine.js";
import moment from "moment";
async function getDataInfo(req, res, next) {
  try {
    let date = req.query.date || req.headers.date || req.body.date;
    if(!date) throw new Error("Please provide date");
    date = new Date(moment(date,'DD-MM-YYYY'))
    let vaccineData = await Vaccine.find({UpdatedOn:date})
    let testingData = await Testing.find({Date:date})
    let covid19Data = await Covid19.find({Date:date})
    return res.status(200).send({
        timestamp: moment().unix(),
        success: true,
        vaccineData,
        testingData,
        covid19Data
      });
  } catch (error) {
    return res.status(400).send({
      timestamp: moment().unix(),
      success: false,
      message: error.message,
      error,
    });
  }
}
async function getStateInfo(req, res, next) {
    try {
      let state = req.query.state || req.headers.state || req.body.state;
      if(!state) throw new Error("Please provide state");
      let vaccineData = await Vaccine.find({State:state}).sort({UpdatedOn: 1})
      let testingData = await Testing.find({State:state}).sort({Date: 1})
      let covid19Data = await Covid19.find({StateOrUnionTerritory:state}).sort({Date: 1})
      return res.status(200).send({
          timestamp: moment().unix(),
          success: true,
          vaccineData,
          testingData,
          covid19Data
        });
    } catch (error) {
      return res.status(400).send({
        timestamp: moment().unix(),
        success: false,
        message: error.message,
        error,
      });
    }
}
async function pinPointState(req, res, next) {
    try {
        let date = req.query.date || req.headers.date || req.body.date;
        if(!date) throw new Error("Please provide date");
        date = new Date(moment(date,'DD-MM-YYYY'))
      let state = req.query.state || req.headers.state || req.body.state;
      if(!state) throw new Error("Please provide state");
      let vaccineData = await Vaccine.find({State:state,UpdatedOn:date})
      let testingData = await Testing.find({State:state,Date:date})
      let covid19Data = await Covid19.find({StateOrUnionTerritory:state,Date:date})
      return res.status(200).send({
          timestamp: moment().unix(),
          success: true,
          vaccineData,
          testingData,
          covid19Data
        });
    } catch (error) {
      return res.status(400).send({
        timestamp: moment().unix(),
        success: false,
        message: error.message,
        error,
      });
    }
}
async function pinPointStateInfo(req, res, next) {
    try {
        let date = req.query.date || req.headers.date || req.body.date;
        if(!date) throw new Error("Please provide date");
        let originalDate = date
        date = new Date(moment(date,'DD-MM-YYYY'))
      let states = req.query.states || req.headers.states || req.body.states;
      if(!states) throw new Error("Please provide state");
      states = states.split(",");
      let promArray = states.map(async state=>{
          return  {
              state:state,
              date:originalDate,
              vaccineData : await Vaccine.find({State:state,UpdatedOn:date}),
              testingData : await Testing.find({State:state,Date:date}),
              covid19Data : await Covid19.find({StateOrUnionTerritory:state,Date:date})
          }
      })
      Promise.all(promArray).then((data)=>{
        return res.status(200).send({
            timestamp: moment().unix(),
            success: true,
            data:data,
          });
      }).catch((err)=>{
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

export { getDataInfo, pinPointState, getStateInfo,pinPointStateInfo };
