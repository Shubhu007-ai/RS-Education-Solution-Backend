import mongoose from "mongoose";

const guidanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },

    selectedCourse: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Guidance = mongoose.model(
  "Guidance",
  guidanceSchema
);

export default Guidance;