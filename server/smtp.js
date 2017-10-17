// const express = require('express');
const fs = require('fs');
const SMTPServer = require('smtp-server').SMTPServer;
const simpleParser = require('mailparser').simpleParser;
const uuid = require("uuid");

exports.startSmtpServer = function (port, datadir) {

    const server = new SMTPServer({
       
        authOptional: true,
       
        onData(stream, session, callback) {

            simpleParser(stream, (err, mail) => {

                if (err) {
                    console.log("Received mail ERROR", err)
                } else {

                    console.log(`received an email from ${mail.from.text} : ${mail.subject}`);

                    try {
                        const filepath = `${datadir}/` + uuid.v4() + ".json";
                        fs.writeFileSync(filepath, JSON.stringify(mail));
                        console.log("stored at : " + filepath);
                    } catch (errSave) { 
                        console.log("error saving email in " + datadir);
                    }

                }

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
