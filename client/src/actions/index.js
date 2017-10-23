import * as types from './actionTypes';
import { mailsApi } from "../api/mailsApi";

const displayMailsSuccess = (mails) => ({
    type: types.DISPLAY_MAILS_SUCCESS,
    mails
})

export function loadMails() {
    // make async call to api, handle promise, dispatch action when promise is resolved
    return async function (dispatch) {

        const mails = await mailsApi.getAllMails();
        dispatch(displayMailsSuccess(mails));

    };
}

export const displayMail = (filename) => ({
    type: types.DISPLAY_MAIL,
    filename
})

const deleteAllMailsSuccess = (filename) => ({
    type: types.DELETE_MAILS_SUCCESS
})

export function deleteAllMails() {
    // make async call to api, handle promise, dispatch action when promise is resolved
    return async function (dispatch) {

        await mailsApi.deleteAllMails();
        dispatch(deleteAllMailsSuccess());

    };
}

const deleteMailSuccess = (filename) => ({
    type: types.DELETE_MAIL_SUCCESS,
    filename
})

export function deleteMail(filename) {
    // make async call to api, handle promise, dispatch action when promise is resolved
    return async function (dispatch) {

        await mailsApi.deleteMail(filename);
        dispatch(deleteMailSuccess(filename));

    };
}

export const getAttachment = (mailFilename, attachmentFilename) => {

    // download directly, there is no reducer for this action
    mailsApi.getAttachment(mailFilename, attachmentFilename);

    // trace an action for the hell of it :)
    return {
        type: types.GET_ATTACHMENT,
        mailFilename,
        attachmentFilename
    }
};
