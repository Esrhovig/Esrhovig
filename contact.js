const nodemailer = require('nodemailer');

function sendEmail(name, email, phone, message) {
  const smtpServer = 'smtp.gmail.com'; // Change this to your SMTP server
  const smtpPort = 587; // Change this to your SMTP port
  const smtpUsername = 'YOUR_EMAIL_ADDRESS';
  const smtpPassword = 'YOUR_EMAIL_PASSWORD';
  const sender = 'YOUR_EMAIL_ADDRESS';
  const recipient = 'recipient-email-address@example.com'; // Replace with your email address

  const transporter = nodemailer.createTransport({
    host: smtpServer,
    port: smtpPort,
    secure: false,
    auth: {
      user: smtpUsername,
      pass: smtpPassword,
    },
  });

  const mailOptions = {
    from: sender,
    to: recipient,
    subject: 'New contact message from your website',
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Failed to send email:', err);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
}



