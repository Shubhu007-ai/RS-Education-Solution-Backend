import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    currentQualification: {
      type: String,
      required: true,
      trim: true,
    },

    contactNo: {
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
  },
  {
    timestamps: true,
  },
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
