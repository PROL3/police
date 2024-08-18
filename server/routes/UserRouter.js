const express = require("express");
const router = express.Router();
const UserModel = require("../Schemas/user");

router.post('/api/employees', async (req, res) => {
    console.log('Received data:', req.body);
    const { name, nationalId, role, salary, workingHours, employmentDate } = req.body;
  
    try {
        // בדיקת חובה של שדות
        if (!name || !nationalId || !role || !salary || !workingHours || !employmentDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // המרה של ערכים מספריים למספרים לפני בדיקת הסוג
        const nationalIdNum = Number(nationalId);
        const salaryNum = Number(salary);
        const workingHoursNum = Number(workingHours);

        // בדיקת סוגים
        if (isNaN(nationalIdNum) || typeof role !== 'string' || typeof name !== 'string' || 
            isNaN(salaryNum) || isNaN(workingHoursNum) || typeof employmentDate !== 'string') {
            return res.status(400).json({ message: 'Bad data type' });
        }

        // בדיקת ערכים שליליים
        if (salaryNum < 0 || workingHoursNum < 0) {
            return res.status(400).json({ message: 'The salary or/and working hours cant be negative' });
        }

        // בדיקת תאריך
        const dateObj = new Date(employmentDate);
        if (isNaN(dateObj.getTime())) {
            return res.status(400).json({ message: 'Bad date format' });
        }
        const employmentDateAfterISO = dateObj.toISOString();

        // יצירת עובד חדש
        const newEmployee = await UserModel.create({ 
            name, 
            nationalId: nationalIdNum, 
            role, 
            salary: salaryNum, 
            workingHours: workingHoursNum, 
            employmentDate: employmentDateAfterISO 
        });

        res.json(newEmployee);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.delete('/api/employees/:nationalId', async (req, res) => {
    try {
        const employee = await UserModel.findOneAndDelete({ nationalId: req.params.nationalId });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/api/employees/', async (req, res) => {
    try {
        const employees = await UserModel.find();
        console.log(employees);

        res.json(employees);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/api/employees/:_id', async (req, res) => {
    const { name, nationalId, role, salary, workingHours, employmentDate } = req.body;
    const nationalIdNum = Number(nationalId);
    const salaryNum = Number(salary);
    const workingHoursNum = Number(workingHours);

    // בדיקת חובה של שדות
    if (!name || !nationalId || !role || !salary || !workingHours || !employmentDate) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // בדיקת אם הערכים המספריים הם שליליים
        if (salaryNum < 0 || workingHoursNum < 0) {
            return res.status(400).json({ message: 'The salary or/and working hours can\'t be negative' });
        }

        // בדיקת תאריך
        const dateObj = new Date(employmentDate);
        if (isNaN(dateObj.getTime())) {
            return res.status(400).json({ message: 'Bad date format' });
        }

        const employmentDateAfterISO = dateObj.toISOString();

        // עדכון המסמך
        const updatedEmployee = await UserModel.findByIdAndUpdate(
            req.params._id, 
            { 
                name, 
                nationalId: nationalIdNum, 
                role, 
                salary: salaryNum, 
                workingHours: workingHoursNum, 
                employmentDate: employmentDateAfterISO 
            }, 
            { new: true }
        );

        // בדיקה אם העובד לא נמצא
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(updatedEmployee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




router.put('/api/employees/:_id/currentWorkingHoursid', async (req, res) => {
     const { currentWorkingHours } = req.body;

    try {
         let checkTotalHours = await UserModel.findById(req.params._id );

        
        if (!checkTotalHours) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (currentWorkingHours > checkTotalHours.workingHours) {
            return res.status(400).json({ message: 'The current hours can\'t be more than working hours' });
        }
        let employee = await UserModel.findByIdAndUpdate({_id:req.params._id}, {currentWorkingHours},{new:true} );

 
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});








module.exports = router
