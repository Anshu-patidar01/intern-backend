import mongoose from "mongoose";
const FullFormSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  formId: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  interested: {
    type: String,
    required: true,
  },
});
const FullFormModel = new mongoose.model("FullFormModel", FullFormSchema);
export default FullFormModel;
