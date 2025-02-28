import mongoose from "mongoose";

const IdeaFormSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  containt: {
    type: String,
    required: true,
  },

  language: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },

  correspondingAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },

  copyright: {
    type: String,
    required: true,
    enum: ["yes", "no"],
  },

  ROCNumber: {
    type: String,
    required: true,
  },
  ROCAttachment: {
    type: String,
    // required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  termAndCondition: {
    type: String,
    required: true,
    enum: ["Accepted", "Rejected"],
  },
  formId: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["Approved", "Pendding", "Rejected"],
  },
});

const IdeaFormModel = mongoose.model("IdeaFormModel", IdeaFormSchema);

export default IdeaFormModel;
