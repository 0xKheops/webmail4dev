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

const mailTemplates = [
  {
    from: "\"webmail4dev\" <welcome@webmail.dev>", // sender address
    to: "you@webmail.dev", // list of receivers
    subject: "Hello !", // Subject line
    text: "Welcome to webmail4dev", // plain text body
    html: "<b>Welcome to webmail4dev</b>" // html body
  },
  {
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
  },
  {
    from: "\"webmail4dev\" <welcome@webmail.dev>", // sender address
    to: "you@webmail.dev", // list of receivers
    subject: "Hello attachment!", // Subject line
    text: "Welcome to webmail4dev", // plain text body
    html: "<b>Welcome to webmail4dev</b>", // html body
    attachments: [
      {
        filename: "README.md",
        path: "./README.md"
      }
    ]
  }
];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//defaults to one mail, but sends X mails if X passed as argument
const args = process.argv.slice(2);
const mailsCount = args.length == 0 ? 1 : args[0];

for (let i = 0; i < mailsCount; i++) {
  const random = getRandomIntInclusive(0, mailTemplates.length - 1);
  const mailTemplate = mailTemplates[random];

  transporter.sendMail(mailTemplate, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
}
