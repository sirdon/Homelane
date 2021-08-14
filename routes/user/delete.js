import User from "../../model/User.js";
import moment from "moment";
export default async function (req, res, next) {
  try {
    let condition = {
      _id: req.params._id,
      isActive: false,
    };
    let userExist = await User.findOne(condition);
    if (userExist) {
      throw new Error("User not Exist");
    } else {
      User.updateOne(
        { _id: req.params._id },
        { isActive: false },
        function (err, data) {
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
              message: "SUCCESSFULLY DELETED",
              data,
            });
          }
        }
      );
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
