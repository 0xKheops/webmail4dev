const fs = require('fs');
const path = require('path');

exports.findAll = function (req, res) {
    fs.readdir("./data", (err, files) => {
        const arFiles = [];
        files.forEach(file => {
            console.log(file);
            const filepath = path.resolve("data/" + file);
            arFiles.push({
                filename: file,
                content: require(filepath), // JSON.parse(fs.readFileSync(, 'utf8'))
            })
        });
        const sortedEmails = arFiles.sort((a, b) => b.content.date.localeCompare(a.content.date));
        res.send(sortedEmails);
    })
}