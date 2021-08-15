import express from "express";
//app config
const routes = express.Router();
routes.use(express.json());
import login from "../Authorization/login.js";
import logout from "../Authorization/logout.js";
import userRoutes from "../user/route.js";
import userPost from "../user/index.js";
import loadDataRoutes from "../LoadDataSet/route.js";
import homelameRoutes from "../HomelaneApi/route.js";
import validateToken from "../Authorization/validateToken.js";
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
routes.post("/user", userPost.post);
// token validation
routes.use(validateToken);
//user routes
routes.use(userRoutes);
routes.use(loadDataRoutes);
routes.use(homelameRoutes);
export default routes;
