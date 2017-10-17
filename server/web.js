const express = require('express');
const mails = require('./mails');

exports.startWebServer = function (port, datadir) {

    //TODO : passer le paramètre datadir à mails

    const server = express();

    // serve static content from ./client/build
    server.use(express.static("client/build"));

    // register rest end points
    server.get('/api/mails', mails.findAll);
    //server.delete('/api/mails/:id', wine.deleteWine);

    // booya
    server.listen(port);

    console.log(`express listening on port ${port}`);

}
