import jwt from "jsonwebtoken";
import userModel from "../models/User.Model.js";
const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log(authHeader);
    if (!authHeader) {
      return res.status(401).send("Unauthorized...!: No Token Provided.");
    }
    const token = authHeader.split(" ")[1];
    // console.log(token);
    // console.log(token);
    if (!token) {
      return res.status(401).send("Unauthorized...!");
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const user = await userModel.findById({ _id: decoded.UserId });

    // console.log(user);
    if (!user) {
      return res.status(401).send("Unauthorized...!");
    }
    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "problem while login...!", error: `${error}` });
  }
};
export default userAuth;
