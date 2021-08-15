import express from "express";
const homelameRoutes = express.Router();
import files from "./index.js";
homelameRoutes.get("/Get_data_info", files.get.getDataInfo);
homelameRoutes.get("/Get_state_info", files.get.getStateInfo);
homelameRoutes.get("/Pinpoint_state", files.get.pinPointState);
homelameRoutes.get("/Pinpoint_state_date", files.get.pinPointStateInfo);
export default homelameRoutes;
