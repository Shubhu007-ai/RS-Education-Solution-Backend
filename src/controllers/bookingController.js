import Booking from "../models/Booking.js";
import User from "../models/User.js";

export const createBooking = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    const { phone, date, time } = req.body;

     if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Invalid phone number",
      });
    }

    const booking = await Booking.create({
      name: user.name,
      email: user.email,
      phone: phone || user.phone, // 🔥 fallback
      date,
      time,
    });

    res.status(201).json(booking);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};