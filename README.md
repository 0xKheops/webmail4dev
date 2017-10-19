# webmail4dev

webmail4dev starts a local smtp server (with no auth) and a web server that displays all emails received by the smtp server, meant for testing environments.

It is meant to be used as an web-based fake mail server for testing applications that send emails, such as SharePoint. Using such a mail server ensures that emails are not sent to real mailboxes, while making it easy for test users to read all outgoing emails at once.

It can be seen as a web alternative to [Papercut](https://github.com/ChangemakerStudios/Papercut) or [smtp4dev](https://github.com/rnwood/smtp4dev).

![screenshot.png](screenshot.png)

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
