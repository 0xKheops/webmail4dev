const smtp = require("./smtp");
const web = require("./web");
const chalk = require("chalk");
const { getDatabase } = require("./database");

exports.startServer = function (smtpPort, webPort, dataDir) {

    const database = getDatabase(dataDir);

    // start the web server (static files + REST api)
    const onMailReceived = web.startWebServer(webPort, database);

    // start the smtp server
    smtp.startSmtpServer(smtpPort, database, onMailReceived);

    // set a timeout because if smtp or web server fail, it will be asynchronously
    setTimeout(() => {
        console.log(chalk.green(`
Browse emails on http://localhost:${webPort}
`));
    }, 200);

};