import express from "express";
const loadDataRoutes = express.Router();
import files from "./index.js";
loadDataRoutes.get("/loadData", files.get);
loadDataRoutes.post("/loadData", files.post);
export default loadDataRoutes;
