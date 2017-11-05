// const express = require('express');
const SMTPServer = require("smtp-server").SMTPServer;
const simpleParser = require("mailparser").simpleParser;
const chalk = require("chalk");
const { encodeMailContentInHtml } = require("./utils");

exports.startSmtpServer = function (port, database, onMailReceived) {

    const server = new SMTPServer({

        authOptional: true,
        maxAllowedUnauthenticatedCommands: 1000000,

        //called when a mail is received
        onData(stream, session, callback) {

            //save raw input
            const rawParser = new Promise((resolve, reject) => {
                let raw = "";
                stream.on("data", (buffer) => raw += buffer.toString());
                stream.on("end", () => resolve(raw));
                stream.on("error", () => reject("failed to parse incoming mail (raw)"));
            });

            rawParser.then((raw) => {

                // pass raw string because the stream has already been read
                simpleParser(raw, (err, mail) => {

                    if (err) {
                        console.error("failed to parse incoming mail (simpleParser)", err);
                        callback(err);
                    } else {

                        encodeMailContentInHtml(mail);
                        
                        // attachments are buffers, turn them into array before storing into database
                        for (const attachment of mail.attachments) {
                            attachment.content = Array.prototype.slice.call(attachment.content, 0);
                        }

                        console.log(chalk.green(mail.from.text) + " on " + mail.date + " : " + mail.subject);

                        // add raw content so it can be viewed in the app
                        mail.raw = raw;

                        // save mail into the database
                        database.mails.insert(mail, (err, doc) => {

                            if (err) {
                                console.error("failed to save email to database", err);
                                callback(err);
                            }

                            // broadcast for UI update on all clients
                            onMailReceived(doc);

                            // callback for the smtp server
                            callback();

                        });

                    }

                });

            }).catch((err) => {
                console.error(err);
                callback(err);
            });
        }
    });

    server.on("error", err => {

        console.log(chalk.red(`SMTP ERROR : ${err.message}`));

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

    server.listen(port);

    console.log(chalk.cyan(`SMTP listening on port ${port}...`));

};
