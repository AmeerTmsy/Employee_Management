require('dotenv').config();
var cors = require('cors');
const express = require('express');
var cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const EmployeeRoute = require('./routes/employeeRoute');
const Auth = require('./routes/authRoute');
const connectDB = require('./config/db');

app.use(cookieParser());

app.use(cors({
  credentials:true,
  origin: true,
}))

connectDB();
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/employees', EmployeeRoute)
app.use('/auth', Auth)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
