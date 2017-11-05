
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

const mailOptions1 = {
    from: "\"webmail4dev\" <welcome@webmail.dev>", // sender address
    to: "you@webmail.dev", // list of receivers
    subject: "Hello !", // Subject line
    text: "Welcome to webmail4dev", // plain text body
    html: "<b>Welcome to webmail4dev</b>" // html body
};

const mailOptions2 = {
    from: "\"webmail4dev\" <welcome@webmail.dev>", // sender address
    to: "you@webmail.dev", // list of receivers
    subject: "Hello embedded image !", // Subject line
    text: "Welcome to webmail4dev", // plain text body
    html: "<b>Welcome to webmail4dev</b><img src=\"cid:screenshot\" />", // html body
    attachments: [
        {
            filename: "screenshot.png",
            cid: "screenshot",
            path: "./screenshot.png"
        }
    ]
};

const mailOptions3 = {
    from: "\"webmail4dev\" <welcome@webmail.dev>", // sender address
    to: "you@webmail.dev", // list of receivers
    subject: "Hello attachment!", // Subject line
    text: "Welcome to webmail4dev", // plain text body
    html: "<b>Welcome to webmail4dev</b>", // html body
    attachments: [{
        filename: "TODO.md",
        path: "./TODO.md"
    }]
};

transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
});