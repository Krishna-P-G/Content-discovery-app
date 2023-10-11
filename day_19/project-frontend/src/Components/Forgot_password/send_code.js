const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const axios = require("axios");
const https = require("https");
const app = express();
const port = 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Function to send an email
function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "KODING 101 PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
        <!-- Rest of your HTML code -->
      `,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}

app.get("/", (req, res) => {
  console.log(process.env.MY_EMAIL);
});

app.post("/send_recovery_email", (req, res) => {
  const { recipient_email } = req.body;
  const OTP = generateRandomOTP(); // Generate OTP
  sendEmail({ recipient_email, OTP }) // Send the email with OTP
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

// Function to generate a random OTP
function generateRandomOTP(length = 6) {
  const charset = "0123456789";
  let OTP = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    OTP += charset[randomIndex];
  }

  return OTP;
}

// Set up Axios instance with SSL verification disabled
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Disable SSL verification
  }),
});

app.get("/verifybyemail/:email", (req, res) => {
  const { email } = req.params;

  // Make the HTTP request with Axios instance
  axiosInstance
    .get(`http://localhost:8080/login/verifybyemail/${email}`)
    .then((response) => {
      // Handle the response from the API
      console.log(response.data);
      if (response.data === "Email verified") {
        res.status(200).send("Email verified");
      } else {
        res.status(400).send("Email verification failed");
      }
    })
    .catch((error) => {
      // Handle errors from the API
      console.error(error);
      res.status(500).send("An error occurred while verifying email");
    });
});

app.listen(port, () => {
  console.log(`nodemailerProjectsss is listening at http://localhost:${port}`);
});
