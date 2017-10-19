# webmail4dev

webmail4dev starts a local smtp server (with no auth) and a web server that displays all emails received by the smtp server.

It is meant to be used as an easy to use "test mail server" for testing applications that send emails, such as SharePoint. Using such a mail server ensures that no emails is sent to a real mailbox, while making it easy for test users to read those emails.

![screenshot.png](screenshot.png)

As a SharePoint developper (noone's perfect), when testing a workflow or other developments in a user acceptance environment, I often need to provide an easy way for key users to test emails sent by the platform while ensuring that this platform isn't sending emails to real mailboxs. Using papercut or smtp4dev is great for developers, but asking end users to login remotely to a server and launch a windows app for reading those mails isn't a perfect solution. webmail4dev is meant to address this scenario, as it's web based and requires no authentication.

I also see this project as an opportunity to train myself on nodejs, react/redux, sockets, git/github, etc. that I don't use at work. So all improvement suggestions are welcome :)

## Usage

Install and run the application :

```bash
npm install -g webmail4dev
webmail4dev
```

### Options

Run this command to see a list of all available options:

```bash
webmail4dev --help
```
