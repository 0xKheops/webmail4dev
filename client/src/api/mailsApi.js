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

}