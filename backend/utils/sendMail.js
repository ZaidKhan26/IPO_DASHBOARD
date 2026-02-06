const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cosmicos41@gmail.com",
    pass: "qvmv ufxz koqx eaxn"
  }
});

module.exports = async (to, subject, text) => {
  await transporter.sendMail({
    from: "IPO Platform <cosmicos41@gmail.com>",
    to,
    subject,
    text
  });
};
