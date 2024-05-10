const Employee = require("../model/Employee")

const createEmployee = async(req, res) =>{
    try {
        const {f_Name, f_Email, f_Mobile,f_Designation, f_gender,f_Course,f_Image} = req.body
        
        const isEmail = await Employee.findOne({ f_Email: f_Email })

        if (isEmail) {
            return res.status(400).send("email is already registered")
        }

        const createdData = await Employee.create({
            f_Name : f_Name ,
            f_Email : f_Email,
            f_Mobile :f_Mobile,
            f_Designation : f_Designation,
            f_gender : f_gender,
            f_Course : f_Course,
            f_Image : f_Image
        })

        return res.status(201).json(createdData)

    } catch (error) {
        return res.status(500).send(error.message )
    }
}


const getEmployee = async(req, res) =>{
    try {
        const {query} = req.query
        // const {name, email, date, active, deactive} = req.query
        // const filter = {}
        // if(name) filter.f_Name = name
        // if(email) filter.f_Email = email
        // if(date) filter.createdAt = date
        // if(active) filter.isActive = true
        // if(deactive) filter.isActive = false

        // const employeeDetail = await Employee.find({
        //     $or: [
        //       { f_Name: { $regex: query, $options: 'i' } },
        //       { f_Email: { $regex: query, $options: 'i' } },
        //       { createdAt: { $regex: query, $options: 'i' } },
        //       { isActive: { $regex: query, $options: 'i' } }
        //     ]
        //   })

        // Define fields to search on for text matches
        const searchFields = ['f_Name', 'f_Email', 'isActive']; // Text fields
        const searchConditions = searchFields.map(field => ({
            [field]: { $regex: query, $options: 'i' }  
        }));

        // Attempt to interpret the query as a date
        const dateQuery = new Date(query);
        if (!isNaN(dateQuery.getTime())) {
            // It's a valid date, add to search conditions
            searchConditions.push({
                createdAt: { $gte: dateQuery, $lt: new Date(dateQuery.getTime() + 86400000) } // Search for records within that day
            });
        }

        // Execute the search with the conditions
        const employeeDetail = await Employee.find({ $or: searchConditions });

        return res.status(200).json(employeeDetail)
    } catch (error) {
        return res.status(500).send(error.message )
    }
}


const getAllEmployee = async(req, res) =>{
    try {
        const employeeDetail = await Employee.find({isActive : "active"})

        return res.status(200).json(employeeDetail)
    } catch (error) {
        return res.status(500).send(error.message )
    }
}


const updateEmployee = async(req, res) =>{
    try {
        const {employeeId} = req.params
        const {f_Name, f_Email, f_Mobile,f_Designation, f_gender,f_Course,f_Image} = req.body

        const isEmail = await Employee.findOne({ f_Email: f_Email, isActive : "active" })

        if (isEmail) {
            return res.status(400).send("email is already registered")
        }

        let filter = {};

        if(f_Name) filter.f_Name = f_Name
        if(f_Email) filter.f_Email = f_Email
        if(f_Mobile) filter.f_Mobile = f_Mobile
        if(f_Designation) filter.f_Designation = f_Designation
        if(f_gender) filter.f_gender = f_gender
        if(f_Course) filter.f_Course = f_Course
        if(f_Image) filter.f_Image = f_Image

        const updatedData = await Employee.findByIdAndUpdate(employeeId , filter, { new: true })
        
        return res.status(200).send(updatedData)
        
    } catch (error) {
        return res.status(500).send(error.message )
    }
}

const deleteEmployee = async (req, res)=>{
    try {
        const {employeeId} = req.body

        await Employee.findByIdAndUpdate(employeeId , {isActive : "deactive"}, { new: true })
        return res.status(200).send("Deleted Employee!")
    } catch (error) {
        return res.status(500).send(error.message )
    }
}


module.exports = {createEmployee, getEmployee, getAllEmployee, updateEmployee, deleteEmployee}