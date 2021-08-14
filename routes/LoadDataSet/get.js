import User from "../../model/User.js";
export default async function (req, res, next) {
  let condition = {
    isActive: true,
  };
  let user = await User.find(condition, { password: 0, passwordHistory: 0 });
  return res.status(200).json({
    success: true,
    user,
  });
}
