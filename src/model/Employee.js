const mongoose = require('mongoose')


const employeeSchema = new mongoose.Schema({
    f_Image : {
        type : String,
    },

    f_Name : {
        type : String,
        required : true
    },

    f_Email : {
        type : String,
        required : true,
        unique : true
    },

    f_Mobile : {
        type : Number,
        unique : true,
        minLength: 9,
        maxLength: 10
    },

    f_Designation : {
        type : String,
        enum : ["HR", "Manager", "Sales"],
    },

    f_gender : {
        type : String,
        enum : ["Male", "Female"],
    },

    f_Course : {
        type : [String],
        enum : ["MCA", "BCA", "BSC"],
    },
    isActive : {
        type : String,
        default : "active"
    }
    
}, {timestamps : true})

module.exports = mongoose.model('Employee', employeeSchema)