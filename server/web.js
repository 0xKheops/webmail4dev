const http = require("http");
const express = require('express');
const socket = require("socket.io");

const mails = require('./mails');

exports.startWebServer = function (port, datadir) {

    //TODO : passer le paramètre datadir à mails

    const app = express();
    const server = http.createServer(app);
    const io = socket(server);

    // this handler will be called by smtp server when it receives an email.
    // from here, we can push it to all clients
    const onMailReceived = function(mail){
        io.emit("action", {type:"RECEIVED_MAIL", mail});
    } 

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

    // serve static content from ./client/build
    app.use(express.static("client/build"));

    // register rest end points
    app.get('/api/mails', mails.findAll);
    app.delete('/api/mails/:filename', mails.delete);
    app.delete('/api/mails', mails.deleteAll);

    // booya
    server.listen(port);

    console.log(`express listening on port ${port}`);

    return onMailReceived;

}
