// const express = require('express');
const fs = require('fs');
const SMTPServer = require('smtp-server').SMTPServer;
const simpleParser = require('mailparser').simpleParser;
const uuid = require("uuid");

exports.registerSmtpServer = function (port = 25, datadir = "data") {

    const server = new SMTPServer({
        authOptional: true,
        onData(stream, session, callback) {
            console.log("received an email !");

            simpleParser(stream, (err, mail) => {
                
                const filepath = `${datadir}/` + uuid.v4() + ".json";
                fs.writeFileSync(filepath, JSON.stringify(mail));
                console.log("stored incoming email : " + filepath);

                callback();
            });
        }
    });

    server.on('error', err => {
        console.log('Error %s', err.message);
    });

    server.listen(port);
    console.log(`SMTP listening on port ${port}...`);

}
