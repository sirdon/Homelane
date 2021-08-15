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
//test api for deploment testing
routes.get("/", (req, res) =>{
    try {
        console.log("running")
        return res.status(200).json({
        success: true,
        })
    } catch (error) {
        console.log({error})
        return res.status(400).json({
            success: false,
        })
    }
});
routes.post("/login", login);  //login route
routes.get("/logout", logout);  //logout route
routes.post("/user", userPost.post);   //user create route
// token validation
routes.use(validateToken);
//user routes
routes.use(userRoutes);     //other routes for users
routes.use(loadDataRoutes);     //data load api route
routes.use(homelameRoutes);        //homelane apis for get data
export default routes;
