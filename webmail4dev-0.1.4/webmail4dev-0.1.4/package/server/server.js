const path = require("path");
const smtp = require("./smtp");
const web = require("./web");
const fs = require("fs");
const chalk = require("chalk");

exports.startServer = function (smtpPort, webPort, dataDir) {

    // ensure the data directory exists
    const resolvedDataDir = path.resolve(dataDir);
    if (!fs.existsSync(resolvedDataDir)) {
        fs.mkdirSync(resolvedDataDir);
    }

    // store as environment variable to make it easy for REST api and SMTP to consume it
    process.env["DATA_DIRECTORY"] = resolvedDataDir;
    console.log(chalk.gray("data directory : " + dataDir));

    // start the web server (static files + REST api)
    const onMailReceived = web.startWebServer(webPort);

    // start the smtp server
    smtp.startSmtpServer(smtpPort, onMailReceived);

    // set a timeout because if smtp or web server fail, it will be asynchronously
    setTimeout(() => {
        console.log(chalk.green(`
Browse emails on http://localhost:${webPort}
`));
    }, 200);

};