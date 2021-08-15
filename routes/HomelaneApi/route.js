import express from "express";
const homelameRoutes = express.Router();
import files from "./index.js";
homelameRoutes.get("/Get_state_info", files.get.getDateInfo);
homelameRoutes.get("/Get_date_info", files.get.getStateInfo);
homelameRoutes.get("/Pinpoint_state", files.get.pinPointState);
homelameRoutes.get("/Pinpoint_info", files.get.pinPointInfo);
export default homelameRoutes;
