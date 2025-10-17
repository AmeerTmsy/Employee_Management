
require('dotenv').config();
var cors = require('cors');
const express = require('express');
var cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const requestIp = require('request-ip')
const passport = require('passport');
require('./config/googleAuth')

const Employee = require('./routes/employeeRoute');
const Auth = require('./routes/authRoute');
const Attendance = require('./routes/attendanceRoute');
const Task = require('./routes/taskRoutes');
const LeaveRequest = require('./routes/leaveRequestRoute');
const GoogleAuth = require('./routes/auth')
const CalendarEvent = require("./routes/calendarRoute")
const checkNetworkIPA = require('./midleware/networkIPA');
const SalarySlip = require('./routes/salaryRoute');
const Project = require('./routes/projectRoute');
const PublicHoliday = require('./routes/publicHolidayRoute');

const connectDB = require('./config/db');
connectDB();

app.use(express.json())
app.set('trust proxy', true)
app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', 'skip-browser-warning');
  next();
});
console.log(process.env.FRONTEND_URL)
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(requestIp.mw());
// app.get("/api/check", checkNetworkIPA);
app.get("/", (req, res) => res.send("API is running..."));

app.use('/employees', Employee)
app.use('/auth', Auth)
app.use('/attendance', Attendance) 
app.use('/task', Task)
app.use('/leave-request', LeaveRequest)
app.use('/api/auth', GoogleAuth)
app.use("/api/calendar", CalendarEvent);
app.use("/project", Project);
app.use("/public-holiday", PublicHoliday);

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`) 
})
