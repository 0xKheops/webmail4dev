export class mailsApi {
  static async getAllMails() {
    const req = await fetch("/api/mails");

    if (!req.ok) throw new Error(`${req.status} ${req.statusText}`);

    return await req.json();
  }

  static async getMail(id) {
    const req = await fetch("/api/mails/" + id);

    if (!req.ok) throw new Error(`${req.status} ${req.statusText}`);

    return await req.json();
  }

  static async deleteAllMails() {
    const req = await fetch("/api/mails", {
      method: "DELETE",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON"
      },
      credentials: "same-origin"
    });

    if (!req.ok) throw new Error(`${req.status} ${req.statusText}`);
  }

  static async deleteOneMail(id) {
    const req = await fetch("/api/mails/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON"
      },
      credentials: "same-origin"
    });

    if (!req.ok) throw new Error(`${req.status} ${req.statusText}`);
  }

  static downloadAttachment(id, filename) {
    const fileUrl = "/api/mails/" + encodeURI(id) + "/" + encodeURI(filename);

    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style["display"] = "none";
    a.href = fileUrl;
    a.download = filename;
    a.click();
  }
}
