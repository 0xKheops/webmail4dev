const smtp = require("./smtp");
const web = require("./web");

exports.startServer = function (smtpPort, webPort, dataDir) {

    // console.log("starting web server " + webPort);
    const onMailReceived = web.startWebServer(webPort, dataDir);
    
    // console.log("starting smtp server " + smtpPort);
    smtp.startSmtpServer(smtpPort, dataDir, onMailReceived);

    console.log(`
Browse emails on http://localhost:${webPort}
`);
};