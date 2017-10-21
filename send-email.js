
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 25,
    secure: false,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

const mailOptions = {
    from: "\"webmail4dev\" <welcome@webmail.dev>", // sender address
    to: "you@webmail.dev, you@webmail.dev", // list of receivers
    subject: "Hello !", // Subject line
    text: "Welcome to webmail4dev", // plain text body
    html: "<b>Welcome to webmail4dev</b>" // html body
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
});