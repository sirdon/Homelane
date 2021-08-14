import express from "express";
const userRoutes = express.Router();
import files from "./index.js";
userRoutes.get("/user", files.get);
userRoutes.put("/user/edit-name/:_id", files.put.editName);
userRoutes.put("/user/edit-password/:_id", files.put.editPassword);
userRoutes.put("/user/update/:_id", files.put.update);
userRoutes.delete("/user/:_id", files.delete);
export default userRoutes;
