const path = require("path");
const smtp = require("./smtp");
const web = require("./web");
const fs = require("fs");

exports.startServer = function (smtpPort, webPort, dataDir) {

    // ensure the data directory exists
    const resolvedDataDir = path.resolve(dataDir);
    if (!fs.existsSync(resolvedDataDir)) {
        fs.mkdirSync(resolvedDataDir);
    }
    
    // store as environment variable to make it easy for REST api and SMTP to consume it
    process.env["DATA_DIRECTORY"] = resolvedDataDir;

    // console.log("starting web server " + webPort);
    const onMailReceived = web.startWebServer(webPort);

    // console.log("starting smtp server " + smtpPort);
    smtp.startSmtpServer(smtpPort, onMailReceived);

    console.log(`
Browse emails on http://localhost:${webPort}
`);

};