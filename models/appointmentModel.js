const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorInfo: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "None", // Set a default value for the description field
    },
  },
  { timestamps: true }
);

// Indexes
appointmentSchema.index({ userId: 1 }); // Index on userId field
appointmentSchema.index({ doctorId: 1 }); // Index on doctorId field
appointmentSchema.index({ doctorInfo: "text" }); // Text index on doctorInfo field
appointmentSchema.index({ userInfo: "text" }); // Text index on userInfo field
const appointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = appointmentModel;
