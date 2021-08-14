import moment from "moment";
export default async function (req, res, next) {
  try {
    console.log("headers", req.headers);
    res
      .cookie("token", "", { httpOnly: true, expires: new Date(0) })
      .status(200)
      .send({
        timestamp: moment().unix(),
        success: true,
        message: "Logout success",
      });
  } catch (error) {
    return res.status(400).send({
      timestamp: moment().unix(),
      success: false,
      message: error.message,
      error,
    });
  }
}
