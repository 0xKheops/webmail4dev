const smtp = require("./server/smtp");
const web = require("./server/web")
const meow = require('meow');

const cli = meow(`
Usage
  $ webmail4dev -w=80 -s=25 -d="./data"

Options
  -w, --web   Specify the web port (default is 2580)
  -s, --smtp  Specify the smtp port (default is 25)
  -d, --data  Specify the mail storage directory (default is "./data")

Examples
  $ webmail4dev
  $ webmail4dev --web=80
  $ webmail4dev -w=80
 
`, {
    alias: {
      s: 'smtp',
      w: "web",
      d: "d"
    }
  });

// display help message if requested
if (cli.flags.h) {
  console.log(cli.help);
  process.exit();
}

const smtpPort = cli.flags.s || 25
const webPort = cli.flags.w || 2580
const dataDir = cli.flags.d || "./data"

// console.log("emails directory : " + dataDir);

// console.log("starting smtp server " + smtpPort);
smtp.startSmtpServer(smtpPort, dataDir);

// console.log("starting web server " + webPort);
web.startWebServer(webPort, dataDir);

console.log(`
Browse emails on http://localhost:${webPort}
`);