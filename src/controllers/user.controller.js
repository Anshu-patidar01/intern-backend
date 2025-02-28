import UserModel from "../models/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import IdeaFormModel from "../models/IdeaForm.Model.js";
const login = async (req, res) => {
  try {
    const { fullname, email, mobileNumber, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    if (!email || !password) {
      throw new Error("All fields are mandatory.");
    }

    const user = await UserModel.findOne({ email });
    // I have to write logic of sign in here
    if (user) {
      const isMatched = bcrypt.compare(password, user.password);
      if (!isMatched) {
        throw new Error("User name or Password is wrong.");
      }
      const UserId = user._id;
      const token = jwt.sign({ UserId }, process.env.SECRETKEY, {
        expiresIn: "1h",
      });
      if (!token) {
        throw new Error("token not genrated.");
      }
      res.status(200).json({ user, token });
    } else {
      // Creating new user
      const userx = await UserModel.create({
        fullname,
        email,
        mobileNumber,
        password: hashpassword,
      });
      const UserId = userx._id;
      const token = jwt.sign({ UserId }, process.env.SECRETKEY, {
        expiresIn: "1h",
      });
      if (!token) {
        throw new Error("token not genrated.");
      }
      res.status(201).json({ user: userx, token: token });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Problem while registering", Error: `${error}` });
  }
};
const Likes = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).send("form Id not provided.", id);
    }
    const userId = req.user;
    const _id = id;
    const form = await IdeaFormModel.findById({ _id });
    // console.log(id);
    if (!form) {
      throw new Error("Form not found.");
    }
    if (form.likes.includes(userId.id)) {
      const UpdatedForm = await IdeaFormModel.findByIdAndUpdate(id, {
        $pull: { likes: userId._id },
      });
      res.send(UpdatedForm);
    } else {
      const UpdatedForm = await IdeaFormModel.findByIdAndUpdate(_id, {
        $push: { likes: userId._id },
      });
      res.send(UpdatedForm);
    }
  } catch (error) {
    res.json({ message: "Some problem at likes api", error: error.message });
  }
};
export { login, Likes };
