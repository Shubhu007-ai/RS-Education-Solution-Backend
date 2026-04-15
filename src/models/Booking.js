import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,   // 🔥 ADD THIS
    date: String,
    time: String,
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);