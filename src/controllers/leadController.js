import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  try {
    const { studentName, course, currentQualification, contactNo, email } =
      req.body;

    // ✅ Validation
    if (
      !studentName ||
      !course ||
      !currentQualification ||
      !contactNo ||
      !email
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingLead = await Lead.findOne({
      $or: [{ email }, { contactNo }],
    });

    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted your details.",
      });
    }

    // ✅ Save Lead
    const newLead = await Lead.create({
      studentName,
      course,
      currentQualification,
      contactNo,
      email,
    });

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      lead: newLead,
    });
  } catch (error) {
    console.error("Create Lead Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
