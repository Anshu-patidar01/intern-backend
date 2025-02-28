import express from "express";
import {
  getidiaforms,
  updateideaform,
  deleteideaform,
  deletefullform,
  deleterequirementform,
  getAllUsers,
} from "../controllers/Admin.controller.js";
const Router = express.Router();
Router.get("/idiaforms", getidiaforms);
Router.post("/updateidiaforms", updateideaform);

Router.post("/deleteidiaforms", deleteideaform);
Router.post("/deletefullform", deletefullform);
Router.post("/deleteRequirementform", deleterequirementform);

Router.get("/getAllUsers", getAllUsers);
export default Router;
