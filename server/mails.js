const fs = require('fs');
const path = require('path');

exports.findAll = function (req, res) {

    // TODO : use env variable
    const dataDir = "./data";

    // ensure the data directory exists
    if (!fs.existsSync(dataDir)){
        fs.mkdirSync(dataDir);
    }

    fs.readdir(dataDir, (err, files) => {
        const arFiles = [];
        files.forEach(file => {
            
            const filepath = path.resolve(dataDir + "/" + file);
            arFiles.push({
                filename: file,
                content: require(filepath), // JSON.parse(fs.readFileSync(, 'utf8'))
            })
        });
        const sortedEmails = arFiles.sort((a, b) => b.content.date.localeCompare(a.content.date));
        res.send(sortedEmails);
    })
}