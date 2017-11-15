const findAll = function(req, res) {
  console.log("findAll");

  this.database.mails
    .find({}, { from: 1, date: 1, subject: 1, read: 1 })
    .sort({ date: -1 })
    .exec((err, mails) => {
      if (err) {
        console.error(err);
        res.status(500).send("error : " + err);
      } else {
        res.send(mails);
      }
    });
};

const findOne = function(req, res) {
  try {
    const mailId = req.params.id;

    console.log("findOne", mailId);

    this.database.mails.findOne({ _id: mailId }, (err, mail) => {
      if (err) {
        console.error(err);
        res.status(404).send("could not find email " + mailId, err);
      } else {
        for (const attachment of mail.attachments) {
          delete attachment.content;
        }
        res.send(mail);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(404).send();
  }
};

const getAttachment = function(req, res) {
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
          const attachment = mail.attachments.find(
            att => att.filename === filename
          );

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

const updateOne = function(req, res) {
  const id = req.params.id;
  const body = req.body;

  console.log("updateOne", id, body);

  // keep only the "read" property (for now)
  const update = {};
  for (const i in body) {
    if (i === "read") {
      update[i] = body[i];
    }
  }

  this.database.mails.update({ _id: id }, {$set:update}, {}, (err, numReplaced) => {
    if (err || (numReplaced === 0)) {
      console.error(err);
      res.status(404).send("failed to update email " + id, err);
    } else {
      res.status(204).send();
    }
  });

  

  // this.database.mails.remove({ _id: id }, {}, function(err) {
  //   if (err) {
  //     console.error(err);
  //     res.status(404).send("could not find email " + id, err);
  //   } else {
  //     res.send(id + " deleted");
  //   }
  // });
};

const deleteOne = function(req, res) {
  const id = req.params.id;

  console.log("deleteOne", id);

  this.database.mails.remove({ _id: id }, {}, function(err) {
    if (err) {
      console.error(err);
      res.status(404).send("could not find email " + id, err);
    } else {
      res.send(id + " deleted");
    }
  });
};

const deleteAll = function(req, res) {
  console.log("deleteAll");

  this.database.mails.remove({}, { multi: true }, function(err) {
    if (err) {
      console.error(err);
      res.status(500).send("failed to delete all emails", err);
    } else {
      res.send("all emails deleted");
    }
  });
};

exports.getMailApi = function(database) {
  const api = {
    database
  };

  return {
    database,
    findAll: findAll.bind(api),
    findOne: findOne.bind(api),
    updateOne: updateOne.bind(api),
    getAttachment: getAttachment.bind(api),
    deleteOne: deleteOne.bind(api),
    deleteAll: deleteAll.bind(api)
  };
};
