const mongoose = require('mongoose')


const loginSchema = new mongoose.Schema({

    f_userName : {
        type :String,
        required : true,
        unique : true
    },
    f_Pwd : {
        type :String,
        required : true
    },
    f_Name : {
        type :String,
        required : true
    },
    f_Email : {
        type :String,
        required : true,
    }
    
}, {timestamps : true})

module.exports = mongoose.model('Login', loginSchema)