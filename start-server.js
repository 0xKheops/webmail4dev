const smtp = require("./server/smtp");
const web = require("./server/web");

smtp.startSmtpServer(25, "./data");
console.log("smtp server started");

web.startWebServer(2581, "./data");
console.log("web & server started");