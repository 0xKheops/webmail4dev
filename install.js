const service = require ("os-service");

service.add ("my-service");

service.remove ("my-service");

var logStream = fs.createWriteStream ("my-service.log");

service.run (logStream, function () {
    console.log ("stop request received");
    service.stop ();
});