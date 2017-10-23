const fs = require("fs");
const path = require("path");

exports.findAll = function (req, res) {

    const dataDir = process.env["DATA_DIRECTORY"];

    fs.readdir(dataDir, (err, files) => {
        const arFiles = [];
        files.forEach(file => {

            const filepath = path.resolve(dataDir + "/" + file);
            const mail = JSON.parse(fs.readFileSync(filepath));

            if (mail.attachments) {
                // remove the data on each attachment, as it will be downloaded on demand
                for (const attachment of mail.attachments) {
                    delete attachment.content;
                }
            }

            arFiles.push({
                filename: file,
                content: mail,
            });


        });
        const sortedEmails = arFiles.sort((a, b) => b.content.date.localeCompare(a.content.date));
        res.send(sortedEmails);
    });

};

exports.getAttachment = function (req, res) {

    try {

        const dataDir = process.env["DATA_DIRECTORY"];

        const mailFilename = req.params.mailFilename;
        const filepath = path.resolve(dataDir + "/" + mailFilename);
        const mail = require(filepath);

        const attachmentFilename = req.params.attachmentFilename;
        const attachment = mail.attachments.find(att => att.filename === attachmentFilename);

        res.writeHead(200, {
            "Content-Type": attachment.contentType,
            "Content-disposition": "attachment;filename=" + attachment.filename,
            "Content-Length": attachment.size
        });
        res.end(new Buffer(attachment.content.data, "binary"));

    } catch (err) {
        console.error(err);
        res.status(404).send("could not find attachment");
    }

};

exports.delete = function (req, res) {

    const dataDir = process.env["DATA_DIRECTORY"];

    const filename = req.params.filename;
    const filepath = path.resolve(dataDir + "/" + filename);

    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        res.send(req.params.filename + " deleted");
    } else {
        res.status(404).send("could not find " + req.params.filename);
    }

};

exports.deleteAll = function (req, res) {

    const dataDir = process.env["DATA_DIRECTORY"];

    fs.readdir(dataDir, (err, files) => {
        files.forEach(file => {

            const filepath = path.resolve(dataDir + "/" + file);
            fs.unlinkSync(filepath);

        });
        res.send();
    });

};