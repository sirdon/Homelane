import User from "../../model/User.js";
import moment from "moment";
import Crypto from "crypto-js";
async function editName(req, res, next) {
  try {
    if (!req.body.name) throw new Error("Invailid params");
    let condition = {
      _id: req.params._id,
    };
    let updateData = {
      name: req.body.name,
      modifiedAt: new Date(),
    };
    let userExist = await User.findOne(condition);
    if (!userExist) throw new Error("User not found with this id");
    else {
      User.updateOne(condition, updateData, function (err, data) {
        if (err) {
          return res.status(400).send({
            timestamp: moment().unix(),
            success: false,
            message: err.message,
            err,
          });
        } else {
          res.cookie("token", 124552);
          return res.status(201).send({
            timestamp: moment().unix(),
            success: true,
            message: "SUCCESSFULLY UPDATED",
            data,
          });
        }
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
async function editPassword(req, res, next) {
  try {
    if (!req.body.password) throw new Error("Invailid params");
    let condition = {
      _id: req.params._id,
    };

    let userExist = await User.findOne(condition);
    if (!userExist) throw new Error("User not found with this id");
    else {
      if (!process.env.SALT)
        throw new Error("Salt not found while creating user");
      let updateData = {
        password: Crypto.HmacSHA256(
          req.body.password,
          process.env.SALT.toString()
        ).toString(),
        modifiedAt: new Date(),
        $push: {
          passwordHistory: {
            password: userExist.password,
            createDate: userExist.modifiedAt,
          },
        },
      };
      User.updateOne(condition, updateData, function (err, data) {
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
            message: "SUCCESSFULLY UPDATED",
            data,
          });
        }
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
async function update(req, res, next) {
  try {
    let condition = {
      _id: req.params._id,
    };
    let updateData = req.body;
    if (req.body.password) throw new Error("password can't changed");
    Object.assign(updateData, { modifiedAt: new Date() });
    let userExist = await User.findOne(condition);
    if (!userExist) throw new Error("User not found with this id");
    else {
      User.updateOne(condition, updateData, function (err, data) {
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
            message: "SUCCESSFULLY UPDATED",
            data,
          });
        }
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

export { editName, update, editPassword };
