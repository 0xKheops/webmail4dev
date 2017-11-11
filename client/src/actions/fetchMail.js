import * as types from './actionTypes';
import { mailsApi } from "../api/mailsApi";

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
