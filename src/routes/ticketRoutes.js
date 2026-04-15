import express from "express";
import { createTicket } from "../controllers/ticketController.js";
import { protect } from "../middleware/authMiddleware.js";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ CREATE TICKET (USER)
router.post("/create", protect, createTicket);


// ===============================
// 🔥 ADMIN ROUTES
// ===============================

// ✅ GET ALL TICKETS
router.get("/all", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    // 🔐 CHECK ADMIN
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ UPDATE TICKET STATUS
router.put("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    // 🔐 CHECK ADMIN
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(ticket);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;