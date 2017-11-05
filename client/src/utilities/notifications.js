import * as actions from "../actions";

let currentStore = null;

export const notifyEmailReceived = (mail) => {

    try {
        // ensure that browser can handle notifications
        if (!("Notification" in window)) {
            return;
        }

        // Ensure user has give permission to use notifications
        if (Notification.permission === "granted") {

            const title = mail.from.value.length === 1 ?
                mail.from.value[0].name || mail.from.value[0].address :
                mail.from.text

            // Si c'est ok, créons une notification
            const notification = new Notification(title, {
                body: mail.subject,
                icon: "/favicon.ico",
                data: mail.filename,
            });

            notification.onclick = function () {
                
                window.focus();
                notification.close();

                if (currentStore) {
                    currentStore.dispatch(actions.displayMail(mail._id));
                }

            };
        }

    } catch (err) {
        console.error("failed to notify email received", err);
    }

};

export const registerNotifications = (store) => {

    try {

        if (!("Notification" in window)) {
            // browser doesn't support notifications.
            return;
        }

        // if notifications have not been denied or granted yet
        if (Notification.permission !== "granted" && Notification.permission !== 'denied') {

            Notification.requestPermission(function (permission) {

                // store user choice
                if (!('permission' in Notification)) {
                    Notification.permission = permission;
                }

            }, );

        }

        // make store accessible for notifications
        currentStore = store;

    } catch (err) {
        console.error("failed to register notifications", err);
    }

}