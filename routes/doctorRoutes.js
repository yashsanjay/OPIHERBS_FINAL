const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
  getUserInfoController,
  doctorAppointmentsControllerr,
} = require("../controllers/doctorCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);


router.post("/updateProfile", authMiddleware, updateProfileController);


router.post("/getDoctorById", authMiddleware, getDoctorByIdController);


router.get("/doctor-appointments", authMiddleware, doctorAppointmentsController);


router.post("/update-status", authMiddleware, updateStatusController);

router.get("/:userId", authMiddleware, getUserInfoController);

module.exports = router;
