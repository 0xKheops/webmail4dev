const http = require("http");
const express = require("express");
const socket = require("socket.io");
const path = require("path");
const chalk = require("chalk");
const favicon = require("express-favicon");

const mails = require("./mails");

exports.startWebServer = function (port) {

    const app = express();
    const server = http.createServer(app);

    // this handler will be called by smtp server when it receives an email.
    // from here, we can push it to all clients
    const io = socket(server);
    const onMailReceived = function (mail) {
        io.emit("action", { type: "RECEIVED_MAIL", mail });
    };

    // serve static content from ./dist
    const staticDir = path.join(__dirname, "../dist");
    app.use(favicon(path.join(staticDir, "favicon.ico"))); 
    app.use(express.static(staticDir));
  
    // register rest end points
    app.get("/api/mails", mails.findAll);
    app.delete("/api/mails/:filename", mails.delete);
    app.delete("/api/mails", mails.deleteAll);

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
