import User from "../../model/User.js";
import dotenv from "dotenv";
import moment from "moment";
import Crypto from "crypto-js";
dotenv.config();
export default async function (req, res, next) {
  try {
    let userData = req.body;
    userData.userType = userData.userType
      ? userData.userType.toUpperCase()
      : "WEB USER";
    let condition = {
      email: req.body.email,
      userType: req.body.userType,
    };
    let userExist;
    if (req.body.email) {
      userExist = await User.findOne(condition);
    }
    if (!process.env.SALT)
      throw new Error("Salt not found while creating user");
    userData.password = Crypto.HmacSHA256(
      userData.password,
      process.env.SALT.toString()
    ).toString();
    if (userExist) {
      throw new Error("User Already Exist with this Email");
    } else {
      let user = new User(req.body);
      user.save(function (err, data) {
        if (err) {
          return res.status(400).send({
            timestamp: moment().unix(),
            success: false,
            message: err.message,
            err,
          });
        } else {
          return res.status(201).send({
            timestamp: moment().unix(),
            success: true,
            message: "SUCCESSFULLY CREATED",
            data,
          });
        }
      });
    }
  } catch (err) {
    return res.status(400).send({
      timestamp: moment().unix(),
      success: false,
      message: err.message,
      err,
    });
  }
}
