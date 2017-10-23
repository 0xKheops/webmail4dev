#! /usr/bin/env node

/**
 ** Change to the module directory so this program can run as a service.
 **/
process.chdir(__dirname);

const meow = require("meow");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const service = require("os-service");
const { startServer } = require("./server/server");

const cli = meow(`
Usage

  webmail4dev [options]

Options

  --install      Installs webmail4dev as a service 
  --uninstall    Uninstalls existing webmail4dev service 
  --web=port     Specify the web port (default is 2580)
  --smtp=port    Specify the smtp port (default is 25)
  --data=path    Specify the mail storage directory (default is "./data")
  --log=path     Specify the mail storage directory (default is "./webmail4dev.log")

  if no option is provided, webmail4dev will start in current thread with default options.

Example

  webmail4dev --install --web=80 --data="C:\\webmail4dev\\data" --log="C:\\webmail4dev\\log.txt"
 
`, {
    alias: {
      s: "smtp",
      w: "web",
      d: "data",
      h: "help"
    }
  });

// display help message if requested
if (cli.flags.h) {
  console.log(cli.help);
  process.exit(-1);
}

const smtpPort = cli.flags.s || 25;
const webPort = cli.flags.w || 2580;
const dataDir = cli.flags.d || path.join(__dirname, "data");
const logFilePath = cli.flags.l || path.join(__dirname, "webmail4dev.log");

//install, uninstall or run
if (cli.flags.install) {

  console.log("Installing service...");

  //compute new args
  const svcArgs = ["--run"];
  for (const arg of ["smtp", "web", "data"]) {
    if (cli.flags[arg]) {
      svcArgs.push("--" + arg, cli.flags[arg]);
    }
  }

  service.add("webmail4dev", {
    programArgs: svcArgs
  }, function (error) {
    if (error) {
      console.trace(error);
    }
    else {
      console.log("web port : " + webPort);
      console.log("smtp port : " + smtpPort);
      console.log("log file : " + logFilePath);
      console.log("data directory : " + dataDir);
      console.log(chalk.yellow(`Service is installed but not started yet. 
      for Windows : net start webmail4dev
      for Linux : service webmail4dev start`));
    }
  });

} else if (cli.flags.uninstall) {

  console.log("Uninstalling service...");

  service.remove("webmail4dev",
    function (error) {
      if (error)
        console.trace(error);
    });

} else {

  if (cli.flags.run) {

    console.log("starting service...");
    console.log();

    // run the serving by providing current stdout/stderr so it overwrites them with current values
    service.run(process.stdout, process.stdout, function () {
      console.log("stopping service...");
      service.stop(0);
    });

    // overwrite the logging mechanism
    // waiting for https://github.com/stephenwvickers/node-os-service/pull/33
    var logStream = fs.createWriteStream(logFilePath);
    process.stdout.write = process.stderr.write = logStream.write.bind(logStream);

  }

  startServer(smtpPort, webPort, dataDir);

}

