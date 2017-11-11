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

const fetchMailRequest = (id) => ({
    type:types.FETCH_MAIL_REQUEST,
    id
})

const fetchMailSuccess = (mail) => ({
    type:types.FETCH_MAIL_SUCCESS,
    mail
})

const fetchMailFailure = (error) => ({
    type:types.FETCH_MAIL_FAILURE,
    error
})

export function fetchMail(id){
    return async function (dispatch) {
    
        dispatch(fetchMailRequest(id))
    
        try{

            const mail = await mailsApi.getMail(id);
            dispatch(fetchMailSuccess(mail));

        }
        catch(err){

            dispatch(fetchMailFailure(err));

        }
      }
}

export const displayMail = (id) => ({
    type: types.DISPLAY_MAIL,
    id
})

const deleteAllMailsSuccess = () => ({
    type: types.DELETE_MAILS_SUCCESS
})

export function deleteAllMails() {
    // make async call to api, handle promise, dispatch action when promise is resolved
    return async function (dispatch) {

        await mailsApi.deleteAllMails();
        dispatch(deleteAllMailsSuccess());

    };
}

const deleteMailSuccess = (id) => ({
    type: types.DELETE_MAIL_SUCCESS,
    id
})

export function deleteMail(id) {
    // make async call to api, handle promise, dispatch action when promise is resolved
    return async function (dispatch) {

        await mailsApi.deleteMail(id);
        dispatch(deleteMailSuccess(id));

    };
}

export const getAttachment = (id, filename) => {

    // download directly, there is no reducer for this action
    mailsApi.getAttachment(id, filename);

    // trace an action for the hell of it :)
    return {
        type: types.GET_ATTACHMENT,
        id,
        filename
    }
};
