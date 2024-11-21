const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async ({ email, subject, message }) => {
  try {
    // Remove test account creation as we're using real credentials
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD // Changed to match .env file
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify connection
    await transporter.verify();
    console.log('SMTP connection verified');

    let info = await transporter.sendMail({
      from: `"Password Reset" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: message,
      html: `<p>${message}</p>`
    });

    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error('Email error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return false;
  }
};

module.exports = sendEmail;