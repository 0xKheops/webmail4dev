# webmail4dev

This nodejs application is composed of a SMTP server and a web server that shows all emails received by the smtp server.

It is meant to be used as an easy to use "test mail server" for testing applications that send emails, such as SharePoint. Using such a mail server ensures that no emails is sent to a real mailbox, while making it easy for test users to read those emails.

![screenshot.png](screenshot.png)

As a SharePoint developper (noone's perfect), when testing a workflow or other developments in a user acceptance environment, I often need to provide an easy way for key users to test emails sent by the platform while ensuring that this platform isn't sending emails to real mailboxs. Using papercut or smtp4dev is great for developers, but asking end users to login remotely to a server and launch a windows app for reading those mails isn't a perfect solution. webmail4dev is meant to address this scenario, as it's web based and requires no authentication.

I also see this project as an opportunity to train myself on nodejs, react/redux, sockets, git/github, etc. that I don't use at work. So all improvement suggestions are welcome :)

## Install

For now, the application isn't available as an executable binary.

The process for installing the app is the following :

* make sure [nodejs](https://nodejs.org/en/) is installed
* download clone the repository locally
* from the repository's directory, run the following commands :

```bash
cd client
npm install
cd ..
npm install
npm start
```

* configure the platform that you want to test so it sends email to the machine that host the app, on port 25, anonymously.
* browse http://localhost:1337 to view mails sent by the platform

This will start the SMTP on port 25, the REST api on port 3001, and the web server on the port 1337. Received emails will be stored in the data directory.

You can use the SendEmail.ps1 script from the repo to send a test email to the local server.

## Known issues

* users cannot delete emails
* smtp and web ports aren't configurable without modifying the code
* not distributed as a binary
* most common emails header fields aren't displayed

Please be sure that I'm working on fixing this issues ASAP.