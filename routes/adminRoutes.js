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

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin operations
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

/**
 * @swagger
 * /api/v1/admin/getAllUsers:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags: [Admin]
 *     summary: Get all users
 *     description: Retrieves a list of all users
 *     responses:
 *       200:
 *         description: Users data retrieved successfully
 *       500:
 *         description: Error while fetching users data
 */
router.get("/getAllUsers", authMiddleware, getAllUsersController);

/**
 * @swagger
 * /api/v1/admin/getAllDoctors:
 *   get:
 *     summary: Retrieves all doctors
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Doctors data retrieved successfully
 *       500:
 *         description: Error while fetching doctors data
 */
router.get("/getAllDoctors", getAllDoctorsController);

/**
 * @swagger
 * /api/v1/admin/details:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags: [Admin]
 *     summary: Get user details
 *     description: Retrieves details of a user by user ID
 *     parameters:
 *       - in: body
 *         name: userId
 *         required: true
 *         schema:
 *          type: object
 *           properties:
 *              type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error while getting user details
 */
router.get("/details", authMiddleware, getUserDetailsController);

/**
 * @swagger
 * /api/v1/admin/getDoctorById:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags: [Admin]
 *     summary: Get doctor by ID
 *     description: Retrieves details of a doctor by doctor ID
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
 *         description: Doctor details retrieved successfully
 *       500:
 *         description: Error while getting doctor details
 */
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

/**
 * @swagger
 * /api/v1/admin/changeAccountStatus:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags: [Admin]
 *     summary: Change doctor account status
 *     description: Updates the account status of a doctor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [approved, pending, rejected]
 *     responses:
 *       201:
 *         description: Account status updated successfully
 *       500:
 *         description: Error in updating account status
 */
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;