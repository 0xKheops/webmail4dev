// const express = require('express');
const fs = require("fs");
const SMTPServer = require("smtp-server").SMTPServer;
const simpleParser = require("mailparser").simpleParser;
const uuid = require("uuid");
const path = require("path");
const chalk = require("chalk");

exports.startSmtpServer = function (port, onMailReceived) {

    const server = new SMTPServer({

        authOptional: true,

        onData(stream, session, callback) {

            simpleParser(stream, (err, mail) => {

                if (err) {
                    console.log("Received mail ERROR", err);
                } else {

                    const dataDir = process.env["DATA_DIRECTORY"];

                    try {

                        const filename = uuid.v4() + ".json";
                        const filepath = path.join(dataDir, filename);
                        fs.writeFileSync(filepath, JSON.stringify(mail));

                        if (onMailReceived) {
                            onMailReceived({
                                filename: filename,
                                content: mail
                            });
                        }

                    } catch (errSave) {
                        console.log(chalk.red("error saving email in " + dataDir), errSave);
                    }

                }

                callback();

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
