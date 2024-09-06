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

/**
 * @swagger
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *
 * definitions:
 *   DoctorProfileUpdate:
 *     type: object
 *     properties:
 *       userId:
 *         type: string
 *       // Add other properties of doctor profile here

 *   AppointmentStatusUpdate:
 *     type: object
 *     properties:
 *       appointmentsId:
 *         type: string
 *       status:
 *         type: string
 *         enum: [approved, cancelled, rescheduled]
 *
 * /api/v1/doctor/getDoctorInfo:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Doctor
 *     summary: Fetch doctor information
 *     description: Fetches information about a doctor based on the provided user ID
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User ID of the doctor
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *     responses:
 *       200:
 *         description: Doctor data fetched successfully
 *       500:
 *         description: Error in fetching doctor details
 */
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

/**
 * @swagger
 * /api/v1/doctor/updateProfile:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Doctor
 *     summary: Update doctor profile
 *     description: Updates the profile information of a doctor
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Doctor profile data to be updated
 *         required: true
 *         schema:
 *           $ref: "#/definitions/DoctorProfileUpdate"
 *     responses:
 *       201:
 *         description: Doctor profile updated successfully
 *       500:
 *         description: Error in updating doctor profile
 */
router.post("/updateProfile", authMiddleware, updateProfileController);

/**
 * @swagger
 * /api/v1/doctor/getDoctorById:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Doctor
 *     summary: Get single doctor information
 *     description: Fetches information about a single doctor based on the provided doctor ID
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Doctor ID
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             doctorId:
 *               type: string
 *     responses:
 *       200:
 *         description: Doctor information fetched successfully
 *       500:
 *         description: Error in fetching doctor information
 */
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

/**
 * @swagger
 * /api/v1/doctor/doctor-appointments:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Doctor
 *     summary: Get doctor appointments
 *     description: Fetches appointments associated with the authenticated doctor
 *     responses:
 *       200:
 *         description: Doctor appointments fetched successfully
 *       500:
 *         description: Error in fetching doctor appointments
 */
router.get("/doctor-appointments", authMiddleware, doctorAppointmentsController);

/**
 * @swagger
 * /api/v1/doctor/update-status:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Doctor
 *     summary: Update appointment status
 *     description: Updates the status of an appointment
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Appointment ID and status to be updated
 *         required: true
 *         schema:
 *           $ref: "#/definitions/AppointmentStatusUpdate"
 *     responses:
 *       200:
 *         description: Appointment status updated successfully
 *       500:
 *         description: Error in updating appointment status
 */
router.post("/update-status", authMiddleware, updateStatusController);

/**
 * @swagger
 * /api/v1/doctor/{userId}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - User
 *     summary: Get user information
 *     description: Fetches information about a user based on the provided user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: User ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User information fetched successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error in fetching user information
 */
router.get("/:userId", authMiddleware, getUserInfoController);

module.exports = router;
