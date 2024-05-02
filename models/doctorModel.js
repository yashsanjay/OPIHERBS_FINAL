const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    website: {
      type: String,
    },
    district: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "specialization is require"],
    },
    experience: {
      type: String,
      required: [true, "experience is required"],
    },
    feesPerCunsaltation: {
      type: Number,
      required: [true, "fee is required"],
    },
    uid: {
      type: String,
      required: true,
      minlength: [12, "UID must be 12 characters long"],
      maxlength: [12, "UID must be 12 characters long"],
      // unique: true, // Assuming UID should be unique
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Array,
      required: [true, "work timing is required"],
    },
  },
  { timestamps: true }
);

// Indexes
doctorSchema.index({ userId: 1 }); // Index on userId field

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
