import Guidance from "../models/Guidance.js";
import User from "../models/User.js";
import { io } from "../server.js";

export const createGuidance = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    const {
      phone,
      selectedCourse,
      message,
    } = req.body;

    /* =========================
       VALIDATION
    ========================= */
    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Invalid phone number",
      });
    }

    if (!selectedCourse) {
      return res.status(400).json({
        message: "Course is required",
      });
    }

    /* =========================
       SAVE LEAD
    ========================= */
    const guidance = await Guidance.create({
      userId: user._id,
      name: user.name,
      email: user.email,
      phone,
      selectedCourse,
      message,
    });

    io.emit("new-guidance", guidance);

    /* =========================
       RESPONSE
    ========================= */
    res.status(201).json({
      success: true,
      message: "Guidance request submitted",
      guidance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};