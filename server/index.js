
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

const connectDB = require('./config/db');
connectDB();

app.use(express.json())
app.set('trust proxy', true)
app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', 'skip-browser-warning');
  next();
});

app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174","http://192.168.18.53:5173","https://employee-management-seven-rose.vercel.app"], 
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
