import moment from "moment";
import jwt, { decode } from "jsonwebtoken";
import express from "express";
import config from "../config/index.js";
const app = express();
app.set("supersecret", config.supersecret);
export default function (req, res, next) {
  let token =
    req.body.token || req.query.token || req.params.token || req.headers.token;
  if (token) {
    jwt.verify(token, app.get("supersecret"), async function (err, decoded) {
      if (err) {
        console.log("token verification fail", err.message);
        return res.status(401).send({
          success: false,
          message: "Failed to authenticate token ",
          err,
        });
      } else if (!decoded.id) {
        console.log("users id not found jwt.verify : ", err);
        return res
          .status(401)
          .send({ success: false, message: "Failed to authenticate token." });
      } else if (moment().valueOf() > parseInt(decoded.exp)) {
        err = {
          token_expired_at: moment(decoded.exp).format("YYYY-MM-DD HH:mm:ss"),
          token_issued_at: moment(decoded.iat).format("YYYY-MM-DD HH:mm:ss"),
        };
        return res.status(401).send({
          success: false,
          message: "Your token has been expired.",
          err: err,
        });
      } else {
        next();
      }
    });
  } else {
    return res.status(403).send({
      timestamp: moment().unix(),
      success: false,
      message: "No token provided.",
    });
  }
}
