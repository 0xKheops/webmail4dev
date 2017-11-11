export class mailsApi {
  static async getAllMails() {
    const req = await fetch("/api/mails");
    return await req.json();
  }

  static async getMail(id) {
    const req = await fetch("/api/mails/" + id);
    return await req.json();
  }

  static async deleteMails() {
    await fetch("/api/mails", {
      method: "DELETE",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON"
      },
      credentials: "same-origin"
    });
  }

  static async deleteMail(id) {
    await fetch("/api/mails/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON"
      },
      credentials: "same-origin"
    });
  }

  static downloadAttachment(id, filename) {
    const fileUrl =
      "/api/mails/" +
      encodeURI(id) +
      "/" +
      encodeURI(filename);

    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style["display"] = "none";
    a.href = fileUrl;
    a.download = filename;
    a.click();
  }
}
