const Datastore = require("nedb");
const simpleParser = require("mailparser").simpleParser;
const fs = require("fs");
const path = require("path");

exports.getDatabase = (dataDir) => {

    const relativePath = path.join(dataDir, "./mails.db");
    const mailsDbPath = path.resolve(relativePath);

    const mails = new Datastore({
        filename: mailsDbPath,
        autoload: true
    });

    // init with welcome email if datastore is empty
    mails.count({}, (err, count) => {
        if (count === 0) {
            
            const welcome = fs.readFileSync("data/welcome.raw", "utf8");

            simpleParser(welcome, (err, mail) => {
                mail.raw = welcome;
                mails.insert(mail);
            });

        }
    });

    // return an object exposing mails, this way we'll be able to add other datastores later
    return { 
        mails 
    };

};
