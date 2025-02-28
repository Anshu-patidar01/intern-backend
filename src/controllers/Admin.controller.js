import FullFormModel from "../models/FullForm.Model.js";
import IdeaFormModel from "../models/IdeaForm.Model.js";
import RequirementModel from "../models/RequirementForm.Model.js";
import UserModel from "../models/User.Model.js";

const getidiaforms = async (req, res) => {
  const forms = await IdeaFormModel.find({}).populate("userId", "fullname");
  res.send(forms);
};
const updateideaform = async (req, res) => {
  const { formId, status } = req.body;
  try {
    const _id = formId;
    const isIdMatch = await IdeaFormModel.findById({ _id });
    if (!isIdMatch) {
      throw new Error("form not exist.");
    }
    const check = ["Approved", "Pendding", "Rejected"];

    if (!check.includes(status)) {
      throw new Error(" Wrong status.");
    }

    const updatedForm = await IdeaFormModel.findByIdAndUpdate(
      { _id },
      { status: status },
      { new: true, runValidators: true }
    );
    res.send(updatedForm);
  } catch (error) {
    res.json({ message: "error in approve form.", error: error.message });
  }
};
const deleteideaform = async (req, res) => {
  const { formId } = req.body;
  try {
    const _id = formId;
    const isIdMatch = await IdeaFormModel.findById({ _id });
    if (!isIdMatch) {
      throw new Error("form not exist.");
    }
    const deletedform = await IdeaFormModel.findByIdAndDelete(
      { _id },
      { new: true, runValidators: true }
    );
    res.send(deletedform);
  } catch (error) {
    res.json({ message: "error in approve form.", error: error.message });
  }
};
const deletefullform = async (req, res) => {
  const { formId } = req.body;
  try {
    const _id = formId;
    const isIdMatch = await FullFormModel.findById({ _id });
    if (!isIdMatch) {
      throw new Error("full form not exist.");
    }
    const deletedform = await FullFormModel.findByIdAndDelete(
      { _id },
      { new: true, runValidators: true }
    );
    res.send(deletedform);
  } catch (error) {
    res.json({
      message: "error in deleting full form .",
      error: error.message,
    });
  }
};
const deleterequirementform = async (req, res) => {
  const { formId } = req.body;
  try {
    const _id = formId;
    const isIdMatch = await RequirementModel.findById({ _id });
    if (!isIdMatch) {
      throw new Error("full form not exist.");
    }
    const deletedform = await RequirementModel.findByIdAndDelete(
      { _id },
      { new: true, runValidators: true }
    );
    res.send(deletedform);
  } catch (error) {
    res.json({
      message: "error in deleting full form .",
      error: error.message,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    if (!users) throw new Error("Some wrong when getting users..");
    res.send(users);
  } catch (error) {
    res.json({ message: "Error in getting user api..", error: error.message });
  }
};
export {
  getidiaforms,
  updateideaform,
  getAllUsers,
  deleteideaform,
  deletefullform,
  deleterequirementform,
};
