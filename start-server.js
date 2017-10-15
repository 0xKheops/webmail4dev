const smtp = require("./server/smtp");
const web = require("./server/web");

smtp.registerSmtpServer(25, "./data");
console.log("smtp server started");

web.registerWebServer(3001, "./data");
console.log("api web server started");