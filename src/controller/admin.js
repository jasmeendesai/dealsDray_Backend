const Login = require("../model/login")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {SECRET_KEY} = process.env


const register = async(req, res) =>{
    try {
        const {username, password, name , email} = req.body
        
        const isAdminExist = await Login.findOne({f_userName : username})

        if(isAdminExist) {
            return res.status(400).send("Admin is already registered")
        }
        
            // HASH PASSWORD
            const salt = 10;
            const hashPassword = await bcrypt.hash(password, salt);

            const user = await Login.create({
                f_userName : username,
                f_Pwd : hashPassword,
                f_Name : name,
                f_Email : email
            })

            return res.status(200).send({message : "User Registered!"})  
    } catch (error) {
        return res.status(500).send(error.message )
    }
}



const login = async(req, res) =>{
try {
        const {username, password} = req.body

        // CHECK USER IF ALREADY EXIST
        const admin =  await Login.findOne({f_userName : username});

        if(!admin) return res.status(404).send("User not found");

        // CHECK PASSWORD CORRECT
        const validPassword = await bcrypt.compare(password, admin.f_Pwd)

        if(!validPassword) return res.status(400).json("Wrong Password")

        // jwt 
        const token = jwt.sign({ userId: admin._id, exp: 7560606060 }, SECRET_KEY)

        const {__v, createdAt, updatedAt, f_Pwd, ...other} = admin._doc
        
        return res.cookie("accessToken", token, {
            httpOnly : true,
        }).status(200).json({data: other, message : "LoggedIn Successfully!"})

    } catch (error) {
        return res.status(500).send(error.message )
    }
}

const logout = async(req, res) =>{
try {
    res.clearCookie("accessToken", {
        secure : "true",
        sameSite : "none"
    }).status(200).json("User has been logged out!")
    } catch (error) {
        return res.status(500).send(error.message )
    }
}

module.exports = {login, register, logout}