const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

// Function to send reset password email with dynamic subject and text content
function Mail(userEmail, subject, textContent) {
    // Create a transporter using your Gmail account
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shyamsaran0206@gmail.com',
            pass: '____Key____',
          },
        secure: true,
        port: 465,
    });

    // Define the email options
    const mailOptions = {
        from: 'shyamsaran0206@gmail.com' , // Use environment variable for sender email
        to: userEmail, // Use the provided user email
        subject: subject, // Use the dynamically provided subject
        text: textContent, // Use the dynamically provided text content
    };

    // Return the promise for sending the email
    return transporter.sendMail(mailOptions);
}

// Export the function
module.exports = Mail;
