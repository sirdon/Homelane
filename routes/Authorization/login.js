import User from "../../model/User.js";
import Crypto from "crypto-js";
import jwt from "jsonwebtoken";
import moment from "moment";
export default async function (req, res, next) {
  try {
    if (!req.body || !req.body?.password || !req.body?.email)
      throw new Error("Invailed params");
    let condition = {
      email: req.body.email,
    };
    if (!process.env.SUPERSECRET || !process.env.SALT)
      throw new Error("SALT not found while login");
    let userExist = await User.findOne(condition);
    if (!userExist) throw new Error("User not exists");
    if (
      userExist.password ==
      Crypto.HmacSHA256(req.body.password, process.env.SALT).toString()
    ) {
      const token = jwt.sign(
        {
          id: userExist._id,
          name: userExist.name,
          email: userExist.email,
          iat: moment().valueOf(),
          exp: moment().add(1, "day").valueOf(),
        },
        process.env.SUPERSECRET
      );
      res.cookie("token", token, { httpOnly: true }).status(200).send({
        timestamp: moment().unix(),
        success: true,
        message: "Login success",
        token,
      });
    }
  } catch (error) {
    return res.status(400).send({
      timestamp: moment().unix(),
      success: false,
      message: error.message,
      error,
    });
  }
}
