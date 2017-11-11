const smtp = require("./smtp");
const web = require("./web");
const ip = require("ip");

const { getDatabase } = require("./database");

exports.startServer = function (smtpPort, webPort, dataDir) {

    const database = getDatabase(dataDir);

    // start the web server (static files + REST api)
    const onMailReceived = web.startWebServer(webPort, database);

    // start the smtp server
    smtp.startSmtpServer(smtpPort, database, onMailReceived);

    // set a timeout because if smtp or web server fail, it will be asynchronously
    setTimeout(() => {
        console.log("");
        console.log("Browse webmail4dev on :");
        console.log("");
        console.log(`   http://localhost:${webPort}`);
        console.log(`   http://${ip.address()}:${webPort}`);
        console.log("");
        // for(const ni of os.networkInterfaces()){
        //     console.log(`http://${ni}:${webPort}`);
        // }


    }, 200);

};