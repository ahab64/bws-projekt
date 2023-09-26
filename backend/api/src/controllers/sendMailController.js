const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: "reacttest@outlook.de",
    pass: "Passwort001",
  },
});

const sendEmail = async (req, res) => {
  const { emailBody, emailSubject } = req.body;

  const mailOptions = {
    from: "reacttest@outlook.de",
    to: req.body.to,
    subject: emailSubject,
    text: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Email wurde erfolgreich zugestellt!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Fehler beim Senden der E-Mail');
  }
};

module.exports = { sendEmail };
