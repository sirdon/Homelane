import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    poolSize: 10,
  },
  function (err) {
    if (err) {
      console.log("DB connection fail", err);
    } else {
      console.log("DB Connected successfully");
    }
  }
);
export default mongoose.Schema;
