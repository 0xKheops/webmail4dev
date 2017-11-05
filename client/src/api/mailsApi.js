export class mailsApi {

    static async getAllMails() {

        const req = await fetch("/api/mails");
        return await req.json();

    }

    static async deleteAllMails() {

        await fetch("/api/mails", {
            method: 'DELETE',
            headers: {
                Accept: 'application/JSON',
                'Content-Type': 'application/JSON'
            },
            credentials: 'same-origin'
        });

    }

    static async deleteMail(filename) {

        await fetch("/api/mails/" + filename, {
            method: 'DELETE',
            headers: {
                Accept: 'application/JSON',
                'Content-Type': 'application/JSON'
            },
            credentials: 'same-origin'
        })

    }

    static getAttachment(mailFilename, attachmentFilename) {

        
        const fileUrl = "/api/mails/" + encodeURI(mailFilename) + "/" + encodeURI(attachmentFilename);
        
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style["display"] = "none";
        a.href = fileUrl;
        a.download = attachmentFilename;
        a.click();

    }

}