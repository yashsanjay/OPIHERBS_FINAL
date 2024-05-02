const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  getUserDetailsController,
  getDoctorByIdController
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();



router.get("/getAllUsers", authMiddleware, getAllUsersController);


router.get("/getAllDoctors", getAllDoctorsController);

router.get("/details", authMiddleware, getUserDetailsController);


router.post("/getDoctorById", authMiddleware, getDoctorByIdController);


router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;