import * as types from "./actionTypes";
import { mailsApi } from "../api/mailsApi";

const readMailRequest = (id) => ({
  type: types.READ_MAIL_REQUEST,
  id
});

const readMailSuccess = (id) => ({
  type: types.READ_MAIL_SUCCESS,
  id
});

const readMailError = (message, id) => ({
  type: types.READ_MAIL_ERROR,
  id,
  message
});

export function readMail(id) {
  return async function(dispatch) {
    dispatch(readMailRequest(id));

    try {
      await mailsApi.readMail(id);
      dispatch(readMailSuccess(id));
    } catch (err) {
      dispatch(readMailError(err.message, id));
    }
  };
}
