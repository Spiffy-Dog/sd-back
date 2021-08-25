const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();

const PORT = process.env.PORT;
const SENDER_MAIL = process.env.SENDER_MAIL;
const MAIL_PASS = process.env.MAIL_PASS;

const createTemplate = (verifyToken, email) => {
  const mailGen = new Mailgen({
    theme: "default",
    product: {
      name: "Spiffy Dog",
      link: ``,
    },
  });

  const template = {
    body: {
      name: email,
      intro:
        "Добро пожаловать! Мы очень рады, что вы присоединились к Spiffy Dog",
      action: "Чтобы получить доступ к своему аккаунту, нажмите ниже:",
      button: {
        color: "#556b2f",
        text: "Подтвердите свой email",
        link: `https://***/api/users/verify/${verifyToken}`,
      },
    },
  };

  const emailBody = mailgen.generate(template);

  return emailBody;
};

async function sendMail(verifyToken, email) {
  const emailBody = createTemplate(verifyToken, email);

  const transporter = nodemailer.createTransport({
    service: "yahoo",
    auth: {
      user: SENDER_MAIL,
      pass: MAIL_PASS,
    },
  });

  const options = {
    from: SENDER_MAIL,
    to: email,
    subject: "Verification mail",
    html: emailBody,
  };

  try {
    await transporter.sendMail(options);
  } catch (error) {
    throw new Error(`Что-то пошло не так:  ${error.response}`);
  }
}

// async function sendEmail(login, email) {
//   const transporter = nodemailer.createTransport(
//   {
//     service: "yahoo",
//     auth: {
//       user: SENDER_MAIL,
//       pass: MAIL_PASS,
//     },
//     from: SENDER_MAIL,
//   },
//   { from: SENDER_MAIL }
// );
//   await transporter.sendMail({
//     to: email,
//     subject:
//       "✔ Congratulations! You have successfully registered on our website!",
//     text: `Hello! Thank you for registering on our website! A quick reminder : your Login is ${login}`,
//     html: `<h1>Hello!</h1> </br> <p>Thank you for registering at our website!</p> </br> <p>Your Login : <h2>${login}</h2></p>`,
//   });
// }

module.exports = { sendMail };
