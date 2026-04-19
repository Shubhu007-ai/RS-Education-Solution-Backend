import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createGuidance } from "../controllers/guidanceController.js";
import Guidance from "../models/Guidance.js";
import User from "../models/User.js";

const router = express.Router();

/* ===================================
   USER ROUTE
=================================== */

// Submit guidance request
router.post("/create", protect, createGuidance);

/* ===================================
   ADMIN ROUTES
=================================== */

// Get all guidance leads
router.get("/all", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const leads = await Guidance.find().sort({
      createdAt: -1,
    });

    res.json(leads);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete lead
router.delete("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await Guidance.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;