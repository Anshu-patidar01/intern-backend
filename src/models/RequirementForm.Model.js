import mongoose from "mongoose";

const RequirementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  company: {
    type: String,
    required: true,
  },
  mobile: {
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
  interested: {
    type: String,
    required: true,
  },
  Summary: {
    type: String,
    required: true,
  },
  formId: {
    type: String,
    required: true,
  },
});

const RequirementModel = mongoose.model("RequirementModel", RequirementSchema);

export default RequirementModel;
