import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    description: String,
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);