const fs = require("fs");
const path = require("path");

exports.findAll = function (req, res) {

    console.log("findAll");

    const dataDir = process.env["DATA_DIRECTORY"];

    fs.readdir(dataDir, (err, files) => {
        const arFiles = [];
        files.forEach(file => {

            const filepath = path.resolve(dataDir + "/" + file);
            arFiles.push({
                filename: file,
                content: require(filepath), 
            });
        });
        const sortedEmails = arFiles.sort((a, b) => b.content.date.localeCompare(a.content.date));
        res.send(sortedEmails);
    });
    
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