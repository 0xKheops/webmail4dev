import * as types from "./actionTypes";
import { mailsApi } from "../api/mailsApi";

const fetchMailRequest = (id) => ({
  type: types.FETCH_ONE_MAIL_REQUEST,
  id
});

const fetchMailSuccess = (mail) => ({
  type: types.FETCH_ONE_MAIL_SUCCESS,
  mail
});

const fetchMailError = (message, id) => ({
  type: types.FETCH_ONE_MAIL_ERROR,
  id,
  message
});

export function fetchOneMail(id) {
  return async function(dispatch) {
    dispatch(fetchMailRequest(id));

    try {
      const mail = await mailsApi.getMail(id);
      dispatch(fetchMailSuccess(mail));
    } catch (err) {
      dispatch(fetchMailError(err.message, id));
    }
  };
}
