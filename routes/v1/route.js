import express from "express";
//app config
// const routes = express();
const routes = express.Router();
routes.use(express.json());
import login from "../Authorization/login.js";
import logout from "../Authorization/logout.js";
import userRoutes from "../user/route.js";
import userPost from "../user/index.js";
routes.get("/", (req, res) =>{
    try {
        console.log("running")
return res.status(200).json({
  success: true,
})
    } catch (error) {
        console.log({error})
    }
});
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
