import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
//app config
const app = express();
const PORT = process.env.PORT || 8001;
import cors from "cors";
app.use(cors());
app.use(bodyParser.json());
//middleware
// app.use(express.json());
//db config
//api endpoints
import routes from "./routes/v1/route.js";
app.use("/", routes);

//listener
app.listen(PORT, () => console.log(`server running at port ${PORT}`));
