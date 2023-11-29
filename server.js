const express = require('express');
const bodyParser = require('body-parser');
const sendRegistrationEmail = require('./sendEmail');

const app = express();
const port = 3000; // Replace with your desired port

app.use(bodyParser.json());
const studentRecords = [];


app.post('/submitForm', (req, res) => {
    // Process form data
    const studentData = req.body;


    const studentEmail = req.body.email; // Adjust based on your form field names
    const registeredDate = new Date();   // Replace with the actual registered date
    const percentage = parseFloat(studentData.percentage);

    // Check the condition: greater than 70 and less than 90
    if (percentage > 70 && percentage < 90) {
        // Add the student record to the array
        const existingRecordIndex = studentRecords.findIndex(record => record.studentName === studentData.studentName);

        if (existingRecordIndex !== -1) {
            // Update existing record
            studentRecords[existingRecordIndex] = studentData;
        } else {
        studentRecords.push(studentData);
        }

    sendRegistrationEmail(studentData.email, new Date());
    sendRegistrationEmail(studentEmail, registeredDate);

    res.status(200).send('Registration successful');
    } else {
        // Condition not met
        res.status(400).send('Percentage must be greater than 70 and less than 90');
    }
});
// ... (previous server code)

// Endpoint to retrieve student records
app.get('/getStudentRecords', (req, res) => {
    res.json(studentRecords);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
