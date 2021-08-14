import express from "express";
//app config
const app = express();
const routes = express.Router();
import login from "../Authorization/login.js";
import logout from "../Authorization/logout.js";
import userRoutes from "../user/route.js";
import userPost from "../user/index.js";
routes.post("/login", login);
routes.get("/logout", logout);
userRoutes.post("/user", userPost.post);
// token validation
import validateToken from "../Authorization/validateToken.js";
routes.use(validateToken);
//user routes
routes.use(userRoutes);
import loadDataRoutes from "../LoadDataSet/route.js";
import homelameRoutes from "../HomelaneApi/route.js";
routes.use(loadDataRoutes);
routes.use(homelameRoutes);
export default routes;
