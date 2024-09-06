const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 */

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 */
router.post("/login", loginController);

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Registers a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User registered successfully
 */
router.post("/register", registerController);

// Define other routes similarly

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 */

/**
 * @swagger
 * /api/v1/user/getUserData:
 *   post:
 *     summary: Retrieves user data
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User data retrieved successfully
 */
router.post("/getUserData", authMiddleware, authController);

/**
 * @swagger
 * /api/v1/user/getUserInfo:
 *   post:
 *     summary: Retrieves user information
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User information retrieved successfully
 */
router.post("/getUserInfo", authMiddleware, authController);
/**
 * @swagger
 * tags:
 *   name: Doctor
 *   description: Doctor operations
 */

/**
 * @swagger
 * /api/v1/user/apply-doctor:
 *   post:
 *     summary: Applies for doctor status
 *     tags: [Doctor]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               feesPerCunsaltation:
 *                 type: number
 *               experience:
 *                 type: string
 *               specialization:
 *                 type: string
 *               district:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               lastName:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - uid
 *               - feesPerCunsaltation
 *               - experience
 *               - specialization
 *               - district
 *               - email
 *               - phone
 *               - lastName
 *               - name
 *     responses:
 *       '201':
 *         description: Doctor status applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Message indicating the result of the operation
 */


router.post("/apply-doctor", authMiddleware, applyDoctorController);
/**
 * @swagger
 * /book-appointment:
 *   post:
 *     summary: Book an appointment
 *     description: Endpoint to book a new appointment
 *     tags:
 *       - Appointments
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentRequest'
 *     responses:
 *       '200':
 *         description: Appointment booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Appointment booked successfully
 *       '500':
 *         description: Error while booking appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


router.post("/book-appointment", authMiddleware, bookeAppointmnetController);




/**
 * @swagger
 * /api/v1/user/get-all-notification:
 *   post:
 *     summary: Retrieves all notifications
 *     tags: [Doctor]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Notifications retrieved successfully
 */
router.post("/get-all-notification", authMiddleware, getAllNotificationController);

/**
 * @swagger
 * /api/v1/user/delete-all-notification:
 *   post:
 *     summary: Deletes all notifications
 *     tags: [Doctor]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: All notifications deleted successfully
 */
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController);

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment operations
 */

/**
 * @swagger
 * /api/v1/user/getAllDoctors:
 *   get:
 *     summary: Retrieves all doctors
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Doctors retrieved successfully
 */
router.get("/getAllDoctors", authMiddleware, getAllDocotrsController);



/**
 * @swagger
 * /api/v1/user/booking-availbility:
 *   post:
 *     summary: Checks booking availability
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Booking availability checked successfully
 */
router.post("/booking-availbility", authMiddleware, bookingAvailabilityController);

/**
 * @swagger
 * /api/v1/user/user-appointments:
 *   get:
 *     summary: Retrieves user appointments
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User appointments retrieved successfully
 */
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
