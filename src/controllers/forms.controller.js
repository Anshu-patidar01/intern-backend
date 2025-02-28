import FullFormModel from "../models/FullForm.Model.js";
import IdeaFormModel from "../models/IdeaForm.Model.js";
import formModel from "../models/IdeaForm.Model.js";
import RequirementModel from "../models/RequirementForm.Model.js";
import UserModel from "../models/User.Model.js";
const IdiaFormController = async (req, res) => {
  let {
    state,
    correspondingAddress,
    city,
    gender,
    title,
    language,
    categories,
    containt,
    copyright,
    ROCNumber,
    ROCAttachment,
    summary,
    termAndCondition,
  } = req.body;

  try {
    if (
      !state ||
      !correspondingAddress ||
      !city ||
      !gender ||
      !title ||
      !language ||
      !categories ||
      !containt ||
      !copyright ||
      !summary ||
      !termAndCondition
    ) {
      throw new Error("All fields are mandatory");
    }
    const forms = await formModel.find({});
    const formId = categories[0] + (100 + Object.keys(forms).length);
    const status = "Pendding";
    const userId = req.user.id;
    const form = {
      formId,
      state,
      correspondingAddress,
      city,
      gender,
      title,
      language,
      categories,
      containt,
      copyright,
      ROCNumber,
      ROCAttachment,
      summary,
      termAndCondition,
    };
    await formModel.create({
      userId,
      state,
      formId,
      correspondingAddress,
      city,
      gender,
      title,
      language,
      categories,
      containt,
      copyright,
      ROCNumber,
      ROCAttachment,
      summary,
      termAndCondition,
      status,
    });
    res.status(201).json({ message: form });
  } catch (err) {
    res.status(400).json({
      message: "Some Problem in Idia Form.",
      error: err.message,
    });
  }
};
const RequirementForm = async (req, res) => {
  const { company, mobile, city, language, interested, Summary } = req.body;

  try {
    if (!company || !mobile || !city || !language || !interested || !Summary) {
      throw new Error("All fields are required.");
    }

    const forms = await RequirementModel.find({});
    const formId = company + (100 + Object.keys(forms).length);
    const userId = req.user.id;
    const form = await RequirementModel.create({
      company,
      mobile,
      city,
      language,
      interested,
      Summary,
      formId,
      userId,
    });
    res.status(201).json({
      message: "Required Form was Created.",
      data: form,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const FullForm = async (req, res) => {
  const { company, mobile, city, language, interested } = req.body;

  try {
    if (!company || !mobile || !city || !language || !interested) {
      throw new Error("All fields are required.");
    }

    const forms = await FullFormModel.find({});
    const formId = company + (100 + Object.keys(forms).length);
    const userId = req.user.id;
    const form = await FullFormModel.create({
      company,
      mobile,
      city,
      language,
      interested,
      formId,
      userId,
    });
    res.status(201).json({
      message: "Full Form was Created.",
      data: form,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const limitedIdeaForm = async (req, res) => {
  try {
    const forms = await IdeaFormModel.find(
      {},
      "city gender title language categories copyright summary likes _id"
    ).populate("userId", "fullname");
    const modifiedForm = forms.map((form) => {
      let modifiedSummary = "";
      switch (form.categories) {
        case "Short Story":
          modifiedSummary =
            form.summary.split(" ").slice(0, 10).join(" ") + ".....";
          break;
        case "Story":
          modifiedSummary =
            form.summary.split(" ").slice(0, 25).join(" ") + ".....";

          break;
        case "Full Script":
          modifiedSummary =
            form.summary.split(" ").slice(0, 100).join(" ") + ".....";

          break;
        case "Lyrics":
          modifiedSummary =
            form.summary.split(" ").slice(0, 10).join(" ") + ".....";

          break;
        case "Poem":
          modifiedSummary =
            form.summary.split(" ").slice(0, 10).join(" ") + ".....";
          break;
        case "other":
          modifiedSummary =
            form.summary.split(" ").slice(0, 25).join(" ") + ".....";

          break;

        default:
          modifiedSummary =
            form.summary.split(" ").slice(0, 25).join(" ") + ".....";

          break;
      }
      return {
        city: form.city,
        gender: form.gender,
        title: form.title,
        language: form.language,
        categories: form.categories,
        copyright: form.copyright,
        summary: modifiedSummary,
        fullname: form.userId.fullname,
        likes: form.likes,
        _id: form._id,
      };
    });
    res.send(modifiedForm);
  } catch (error) {
    res.status(400).json({
      message: "some problem in limitedideaform.",
      error: error.message,
    });
  }
};

const GetidiaForm = async (req, res) => {
  try {
    const User = req.user;
    if (!User) {
      throw new Error("user not found.");
    }
    const forms = await IdeaFormModel.find({}).populate("userId", "fullname");
    res.send(forms);
  } catch (error) {
    res
      .status(400)
      .json({ message: "some problem in getideaform.", error: error.message });
  }
};
const getrequirementform = async (req, res) => {
  try {
    const forms = await RequirementModel.find({}).populate(
      "userId",
      "fullname"
    );
    res.send(forms);
  } catch (error) {
    res.status(400).json({
      message: "some problem in getRequirement form.",
      error: error.message,
    });
  }
};
const getfullform = async (req, res) => {
  try {
    const forms = await FullFormModel.find({}).populate("userId", "fullname");
    res.send(forms);
  } catch (error) {
    res.status(400).json({
      message: "some problem in get Full Form.",
      error: error.message,
    });
  }
};

export {
  IdiaFormController,
  RequirementForm,
  FullForm,
  GetidiaForm,
  limitedIdeaForm,
  getfullform,
  getrequirementform,
};
