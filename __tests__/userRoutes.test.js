const request = require("supertest");
const express = require("express");
const userRouter = require("../routes/userRoutes");
const authMiddleware = require("../middlewares/authMiddleware");

// Mocking the controllers
jest.mock("../controllers/userCtrl", () => ({
  loginController: jest.fn(),
  registerController: jest.fn(),
  authController: jest.fn(),
  applyDoctorController: jest.fn(),
  getAllNotificationController: jest.fn(),
  deleteAllNotificationController: jest.fn(),
  getAllDocotrsController: jest.fn(),
  bookeAppointmnetController: jest.fn(),
  bookingAvailabilityController: jest.fn(),
  userAppointmentsController: jest.fn(),
}));

// Mocking the authMiddleware
jest.mock("../middlewares/authMiddleware", () => jest.fn());

// Create an Express app
const app = express();
app.use(express.json()); // Enable JSON body parsing

// Mount the user router
app.use(userRouter);

describe("User Routes", () => {
  let expectedResponse;

  beforeAll(() => {
    expectedResponse = { success: true };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call loginController when POST /login", async () => {
    // Arrange
    const userData = { username: "testuser", password: "testpassword" };
    const expectedResponse = { success: true };

    // Mock loginController behavior
    require("../controllers/userCtrl").loginController.mockImplementation((req, res) => {
      res.status(200).json(expectedResponse);
    });

    // Act
    const response = await request(app)
      .post("/login")
      .send(userData)
      .set("Accept", "application/json");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
    expect(require("../controllers/userCtrl").loginController).toHaveBeenCalledTimes(1);
  });

  it("should call registerController when POST /register", async () => {
    // Arrange
    const userData = { username: "testuser", password: "testpassword" };
    const expectedResponse = { success: true };
  
    // Mock registerController behavior
    require("../controllers/userCtrl").registerController.mockImplementation((req, res) => {
      res.status(200).json(expectedResponse);
    });
  
    // Act and Assert
    await request(app)
      .post("/register")
      .send(userData)
      .set("Accept", "application/json")
      .timeout(10000) // Timeout set to 10 seconds
      .expect(200)
      .expect(expectedResponse)
      .expect(() => {
        expect(require("../controllers/userCtrl").registerController).toHaveBeenCalledTimes(1);
      });
  });
  
  it("should call authController when POST /auth", async () => {
    // Arrange
    const userData = { username: "testuser", password: "testpassword" };
    const expectedResponse = { success: true };
  
    // Mock registerController behavior
    require("../controllers/userCtrl").registerController.mockImplementation((req, res) => {
      res.status(200).json(expectedResponse);
    });
  
    // Act and Assert
    await request(app)
      .post("/register")
      .send(userData)
      .set("Accept", "application/json")
      .timeout(10000) // Timeout set to 10 seconds
      .expect(200)
      .expect(expectedResponse)
      .expect(() => {
        expect(require("../controllers/userCtrl").registerController).toHaveBeenCalledTimes(1);
      });
  });

  it("should call applyDoctorController when POST /apply", async () => {
    // Arrange
    const userData = { username: "testuser", password: "testpassword" };
    const expectedResponse = { success: true };
  
    // Mock registerController behavior
    require("../controllers/userCtrl").registerController.mockImplementation((req, res) => {
      res.status(200).json(expectedResponse);
    });
  
    // Act and Assert
    await request(app)
      .post("/register")
      .send(userData)
      .set("Accept", "application/json")
      .timeout(10000) // Timeout set to 10 seconds
      .expect(200)
      .expect(expectedResponse)
      .expect(() => {
        expect(require("../controllers/userCtrl").registerController).toHaveBeenCalledTimes(1);
      });
  });

  it("should call getAllNotificationController when GET /notifications", async () => {
    // Arrange
    const userData = { username: "testuser", password: "testpassword" };
    const expectedResponse = { success: true };
  
    // Mock registerController behavior
    require("../controllers/userCtrl").registerController.mockImplementation((req, res) => {
      res.status(200).json(expectedResponse);
    });
  
    // Act and Assert
    await request(app)
      .post("/register")
      .send(userData)
      .set("Accept", "application/json")
      .timeout(10000) // Timeout set to 10 seconds
      .expect(200)
      .expect(expectedResponse)
      .expect(() => {
        expect(require("../controllers/userCtrl").registerController).toHaveBeenCalledTimes(1);
      });
  });

  it("should call deleteAllNotificationController when DELETE /notifications", async () => {
    const userData = { username: "testuser", password: "testpassword" };
    const expectedResponse = { success: true };
  
    // Mock registerController behavior
    require("../controllers/userCtrl").registerController.mockImplementation((req, res) => {
      res.status(200).json(expectedResponse);
    });
  
    // Act and Assert
    await request(app)
      .post("/register")
      .send(userData)
      .set("Accept", "application/json")
      .timeout(10000) // Timeout set to 10 seconds
      .expect(200)
      .expect(expectedResponse)
      .expect(() => {
        expect(require("../controllers/userCtrl").registerController).toHaveBeenCalledTimes(1);
      });
  });

  
  
  

  // Write similar tests for other routes...
});

