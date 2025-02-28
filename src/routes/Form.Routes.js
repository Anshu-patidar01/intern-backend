import express from "express";
import {
  FullForm,
  getfullform,
  GetidiaForm,
  getrequirementform,
  IdiaFormController,
  limitedIdeaForm,
  RequirementForm,
} from "../controllers/forms.controller.js";
import userAuth from "../middelware/Auth.js";
import { getidiaforms } from "../controllers/Admin.controller.js";
const Router = express.Router();
Router.post("/IdiaForm", userAuth, IdiaFormController);
Router.post("/Requirement", userAuth, RequirementForm);
Router.post("/Fullform", userAuth, FullForm);
Router.get("/IdiaForm", getidiaforms);
Router.get("/Requirement", getrequirementform);
Router.get("/Fullform", getfullform);

Router.get("/getIdiaForm", userAuth, GetidiaForm);
Router.get("/limitedIdiaForm", limitedIdeaForm);
export default Router;
