const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const cookieParser = require('cookie-parser')

const adminRoute = require('./route/admin')
const employeeRoute = require('./route/employee')



require('dotenv').config()

const app = express()

const {PORT, MONGODB_STRING} = process.env

// middlewares
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin : "http://localhost:3000",
}))
app.use(cookieParser())


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

app.post("/api/upload", upload.single('file'), (req, res)=>{
    const file = req.file;
    res.status(200).json(file.filename)
})

mongoose.connect(MONGODB_STRING, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=> console.log("MongoDb is connected"))
.catch((err)=> console.log(err))

app.use('/api/admin', adminRoute)
app.use('/api/employee', employeeRoute)


app.listen(PORT, ()=>{
    console.log(`App runing at port ${PORT}`)
})