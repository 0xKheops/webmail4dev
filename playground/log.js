const fs = require("fs");

console.log("1");

const tmp = process.stdout;

var logStream = fs.createWriteStream(process.argv[1] + ".log", { flags: "a" });

console.log("2");

// process.__defineGetter__("stdout", function () {
//     return null;
// });

process.stdout.write = process.stderr.write = logStream.write.bind(logStream);

// Object.defineProperty(process, "_stdout", {
//     get: function () {
//         return logStream;
//     },
// });

console.log("3");

console.log("4");

process.stdout.write = process.stderr.write = logStream.write.bind(tmp);

console.log("5");