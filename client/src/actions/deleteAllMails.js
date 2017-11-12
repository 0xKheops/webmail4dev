import * as types from "./actionTypes";
import { mailsApi } from "../api/mailsApi";

const deleteAllMailsRequest = () => ({
  type: types.DELETE_ALL_MAILS_REQUEST
});

const deleteAllMailsSuccess = () => ({
  type: types.DELETE_ALL_MAILS_SUCCESS
});

const deleteAllMailsError = (message) => ({
  type: types.DELETE_ALL_MAILS_ERROR,
  message
});

export function deleteAllMails() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return async function(dispatch) {
    dispatch(deleteAllMailsRequest());

    try {
      await mailsApi.deleteAllMails();
      dispatch(deleteAllMailsSuccess());
    } catch (err) {
      dispatch(deleteAllMailsError(err.message));
    }
  };
}
