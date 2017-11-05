const http = require("http");
const express = require("express");
const socket = require("socket.io");
const path = require("path");
const chalk = require("chalk");
const favicon = require("express-favicon");

const mails = require("./mails");

exports.startWebServer = function (port, database) {

    const app = express();
    const server = http.createServer(app);

    // this handler will be called by smtp server when it receives an email.
    // from here, we can push it to all clients
    const io = socket(server);
    const onMailReceived = function (mail) {

        //cleanup email before broadcast (remove attachments)
        for(const attachment of mail.attachments){
            delete attachment.content;
        }

        io.emit("action", { type: "RECEIVED_MAIL", mail });
    };

    // register rest end points
    const mailsApi = mails.getMailApi(database);
    app.get("/api/mails", mailsApi.findAll);
    app.get("/api/mails/:id/:filename", mailsApi.getAttachment);
    app.delete("/api/mails/:id", mailsApi.deleteOne);
    app.delete("/api/mails", mailsApi.deleteAll);

    // serve static content from ./dist
    const staticDir = path.join(__dirname, "../dist");
    app.use(favicon(path.join(staticDir, "favicon.ico"))); 
    app.use(express.static(staticDir));
  
    server.on("error", err => {

        console.log(chalk.red(`WEB/EXPRESS ERROR : ${err.message}`));

        switch (err.code) {
            case "EADDRINUSE":
                console.log(chalk.red(`port ${port} is already in use.`));
                process.exit();
                break;
            case "EACCES":
                console.log(chalk.red(`Access denied on port ${port}. On some operating systems, such as linux, listening on ports below 1000 requires elevated privileges. You may need to run 'sudo webmail4dev' if using linux.`));
                process.exit();
                break;
            default:
                console.log(err);
        }
    });

    // booya
    server.listen(port);

    console.log(chalk.blue(`express serving static files from ${staticDir}`));
    console.log(chalk.blue(`express listening on port ${port}`));

    return onMailReceived;

};
