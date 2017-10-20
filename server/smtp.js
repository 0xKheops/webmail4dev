// const express = require('express');
const fs = require("fs");
const SMTPServer = require("smtp-server").SMTPServer;
const simpleParser = require("mailparser").simpleParser;
const uuid = require("uuid");

exports.startSmtpServer = function (port, datadir, onMailReceived) {

    const server = new SMTPServer({

        authOptional: true,

        onData(stream, session, callback) {

            // stream.pipe(process.stdout); // print message to console
            //stream.on('end', callback)

            simpleParser(stream, (err, mail) => {

                if (err) {
                    console.log("Received mail ERROR", err);
                } else {

                    //console.log(`received an email from ${mail.from.text} : ${mail.subject}`);

                    try {
                        const filename = uuid.v4() + ".json";
                        const filepath = `${datadir}/` + filename;
                        fs.writeFileSync(filepath, JSON.stringify(mail));
                        //console.log("stored at : " + filepath);

                        if (onMailReceived) {
                            //console.log("broadcasting onMailReceived...");
                            onMailReceived({
                                filename: filename,
                                content: mail
                            });
                        }
                    } catch (errSave) {
                        console.log("error saving email in " + datadir);
                    }

                }

                callback();

            });
        }
    });

    server.on("error", err => {
        console.log("Error %s", err.message);
        console.log("If running linux, you may need to use sudo as opening port 25 requires elevated privileges.", err.message);
    });

    server.listen(port);
    console.log(`SMTP listening on port ${port}...`);

};
