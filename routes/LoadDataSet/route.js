import express from "express";
const loadDataRoutes = express.Router();
import files from "./index.js";
loadDataRoutes.post("/loadData", files.post);
export default loadDataRoutes;
