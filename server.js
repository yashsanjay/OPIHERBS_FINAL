// Import necessary modules
const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const multer = require('multer');
const Appointment = require("./models/appointmentModel"); // Adjust the path
const doctorModel = require("./models/doctorModel");
const userModel = require("./models/userModels");
const axios = require("axios");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");





//dotenv config
dotenv.config();

// Create a logs folder if it doesn't exist
const logsFolder = path.join(__dirname, 'logs');
if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder);
}

// // Create a write stream (in append mode) for the logs
// const accessLogStream = fs.createWriteStream(path.join(logsFolder, 'access.log'), { flags: 'a' });

//mongodb connection
connectDB();

//rest object
const app = express();

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('profileImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

//middlewares
app.use(express.json());

// // Log requests to the access.log file
// app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

// Swagger setup
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation of OPIHERBS',
      version: '1.0.0',
      description: 'Documentation for your API',
    },
    servers: [
      {
        url: "http://localhost:8080/"
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Specify individual route files
  apis: ['./routes/userRoutes.js','./routes/adminRoutes.js','./routes/doctorRoutes.js'],
};

const spec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec, {
  swaggerOptions: {
    plugins: [
      (swaggerUi, ctx) => {
        return {
          preSerialize: (req, document) => {
            // Add JWT token to the authorization header
            document.headers['Authorization'] = req.headers.authorization;
            return document;
          },
        };
      },
    ],
  },
}));




app.get('/api/v1/admin/getAllAppointments', async (req, res) => {
  try {
    const allAppointments = await Appointment.find().lean();
    const appointmentsWithData = await Promise.all(
      allAppointments.map(async (appointment) => {
        const doctor = await doctorModel.findOne({ _id: appointment.doctorId });
        
        const user = await userModel.findOne({ _id: appointment.userId }).lean();
        
        return {
          ...appointment,
          doctorName: doctor ? `${doctor.name} ${doctor.lastName}` : 'Unknown Doctor',
          patientName: user ? user.name : 'Unknown User',
        };
      })
    );
    

    res.json({ success: true, data: appointmentsWithData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching appointments' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

//port
const port = process.env.PORT || 8080;

//listen port
app.listen(port, () => {
  const serverMessage = `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`;
  console.log(serverMessage.bgCyan.white);

  // Log to local storage
  if (typeof window !== 'undefined') {
    localStorage.setItem('serverMessage', serverMessage);
  }
});
