const http = require("http");
const express = require("express");
const socket = require("socket.io");
const path = require("path");

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

    // io.on("connection", function (socket) {
    //     console.log("connection");
    //     socket.on("event", function (data) {
    //         console.log("io received event", data);
    //     }),
    //     socket.on("disconnect", function () {
    //         console.log("io disconnect");
    //     }),
    //     socket.on("action", function (action) {
    //         console.log("io action", action);
    //         socket.emit("action", {type:"TEST", data:"haha"});
    //     })
    // })

    // app.use(function (err, req, res, next) {
    //     console.error(err.stack);
    //     //res.status(500).send("Something broke!");
    // });

    // serve static content from ./dist
    const staticDir = path.join(__dirname, "../dist");
    app.use(express.static(staticDir));

    // register rest end points
    app.get("/api/mails", mails.findAll);
    app.delete("/api/mails/:filename", mails.delete);
    app.delete("/api/mails", mails.deleteAll);

    // booya
    server.listen(port);

    console.log(`express listening on port ${port}`);

    return onMailReceived;

};
