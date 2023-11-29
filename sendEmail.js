const nodemailer = require('nodemailer');

function sendRegistrationEmail(studentEmail, registeredDate) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com', // Replace with your email address
            pass: 'your_email_password'   // Replace with your email password
        }
    });

    const interviewDate = new Date(registeredDate);
    interviewDate.setDate(interviewDate.getDate() + 3);

    const mailOptions = {
        from: 'your_email@gmail.com',        // Replace with your email address
        to: studentEmail,
        subject: 'Thanks for Registration',
        text: `Thanks for your registration! Your interview will be scheduled on ${interviewDate.toDateString()}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendRegistrationEmail;
