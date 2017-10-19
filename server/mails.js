const fs = require("fs");
const path = require("path");

exports.findAll = function (req, res) {

    console.log("mails.findAll " + new Date());
    // TODO : use env variable
    const dataDir = "./data";

    // ensure the data directory exists
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    fs.readdir(dataDir, (err, files) => {
        const arFiles = [];
        files.forEach(file => {

            const filepath = path.resolve(dataDir + "/" + file);
            arFiles.push({
                filename: file,
                content: require(filepath), // JSON.parse(fs.readFileSync(, 'utf8'))
            });
        });
        const sortedEmails = arFiles.sort((a, b) => b.content.date.localeCompare(a.content.date));
        res.send(sortedEmails);
    });
};

exports.delete = function (req, res) {

    // TODO : use env variable
    const dataDir = "./data";

    const filename = req.params.filename;
    const filepath = path.resolve(dataDir + "/" + filename);

    if (fs.existsSync(filepath)) {
        console.log("deleting " + filepath);
        fs.unlinkSync(filepath);
        res.send(req.params.filename + " deleted");
    } else {
        console.log("could not find " + filepath);
        res.status(404).send("could not find " + req.params.filename);
    }

};

exports.deleteAll = function (req, res) {

    console.log("deleting all mails bébé !!");

    // TODO : use env variable
    const dataDir = "./data";
  
    fs.readdir(dataDir, (err, files) => {
        files.forEach(file => {
           
            const filepath = path.resolve(dataDir + "/" + file);
             fs.unlinkSync(filepath);
           
        });
        res.send();
    });

};