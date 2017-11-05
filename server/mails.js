
const findAll = function (req, res) {

    this.database.mails.find({}).sort({ date: -1 }).exec((err, mails) => {

        if (err) {
            console.error(err);
            res.status(500).send("error : " + err);
        } else {

            // TODO : remove all but necessary properties (id, from, subject)
            // for now, just remove attachments content
            for (const mail of mails) {
                for (const attachment of mail.attachments) {
                    delete attachment.content;
                }
            }

            res.send(mails);
        }

    });

};

const getAttachment = function (req, res) {

    try {

        const mailId = req.params.id;
        const filename = req.params.filename;

        console.log("getAttachment", mailId, filename);

        this.database.mails.findOne({ _id: mailId }, (err, mail) => {

            if (err) {
                console.error(err);
                res.status(404).send("could not find email " + mailId, err);
            } else {

                try {
                    const attachment = mail.attachments.find(att => att.filename === filename);

                    res.writeHead(200, {
                        "Content-Type": attachment.contentType,
                        "Content-disposition": "attachment;filename=" + attachment.filename,
                        "Content-Length": attachment.size
                    });

                    res.end(new Buffer(attachment.content, "binary"));
                } catch (err2) {
                    // may happen if data isn't good
                    console.error(err2);
                    res.status(404).send("could not find attachment");
                }
            }

        });

    } catch (err) {
        console.error(err);
        res.status(404).send("could not find attachment");
    }

};

const deleteOne = function (req, res) {

    const id = req.params.id;

    this.database.mails.remove({ _id: id }, {}, function (err) {
        if (err) {
            console.error(err);
            res.status(404).send("could not find email " + id, err);
        } else {
            res.send(id + " deleted");
        }
    });

};

const deleteAll = function (req, res) {

    this.database.mails.remove({}, { multi: true }, function (err) {
        if (err) {
            console.error(err);
            res.status(500).send("failed to delete all emails", err);
        } else {
            res.send("all emails deleted");
        }
    });


};

exports.getMailApi = function (database) {

    const api = {
        database
    };

    return {
        database,
        findAll: findAll.bind(api),
        getAttachment: getAttachment.bind(api),
        deleteOne: deleteOne.bind(api),
        deleteAll: deleteAll.bind(api),
    };

};