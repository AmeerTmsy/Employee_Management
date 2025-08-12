require('dotenv').config()
var cors = require('cors')
const express = require('express')
const app = express()
const port = 3000

const EmployeeRoute = require('./routes/employeeRoute');
const connectDB = require('./config/db');

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
