const express = require('express');
const mails = require('./mails');

exports.registerWebServer = function (port = 3001, datadir = "./data") {

    //TODO : passer le paramètre datadir à mails

    const server = express();

    // Express only serves static assets in production
    if (process.env.NODE_ENV === "production") {
        server.use(express.static("client/build"));
    }

    // register rest end points
    server.get('/api/mails', mails.findAll);

    // booya
    server.listen(port);

    console.log(`express listening on port ${port}`);

}

// app.get('/wines/:id', wine.findById);
// app.post('/wines', wine.addWine);
// app.put('/wines/:id', wine.updateWine);
// app.delete('/wines/:id', wine.deleteWine);

// app.listen(3000);
// console.log('Listening on port 3000...');
