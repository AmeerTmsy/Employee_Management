
require('dotenv').config();
var cors = require('cors');
const express = require('express');
var cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const requestIp = require('request-ip')

const EmployeeRoute = require('./routes/employeeRoute');
const Auth = require('./routes/authRoute');
const Attendance = require('./routes/attendanceRoute');
const Task = require('./routes/taskRoutes');
const connectDB = require('./config/db');
connectDB();
app.use(express.json())
const checkNetworkIPA = require('./midleware/networkIPA');
app.set('trust proxy', true)
app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', 'skip-browser-warning');
  next();
});

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(cookieParser());
app.use(requestIp.mw());
app.get("/api/check", checkNetworkIPA);
app.get("/", (req, res) => res.send("API is running..."));

app.use('/employees', EmployeeRoute)
app.use('/auth', Auth)
app.use('/attendance', Attendance) 
app.use('/task', Task)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
