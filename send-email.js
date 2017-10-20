
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
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});