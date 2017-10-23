const rimraf = require('rimraf');
const cpx = require("cpx");

console.log("replacing dist directory");
rimraf("../dist", function () {
    cpx.copy("./build/**/*.*", "../dist");
    console.log("dist directory up to date");
})