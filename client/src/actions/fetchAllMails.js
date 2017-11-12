import * as types from "./actionTypes";
import { mailsApi } from "../api/mailsApi";

const fetchAllMailsRequest = () => ({
  type: types.FETCH_ALL_MAILS_REQUEST
});

const fetchAllMailsSuccess = (mails) => ({
  type: types.FETCH_ALL_MAILS_SUCCESS,
  mails
});

const fetchAllMailsError = (message) => ({
  type: types.FETCH_ALL_MAILS_ERROR,
  message
});

export function fetchAllMails() {
  return async function(dispatch) {
    dispatch(fetchAllMailsRequest());

    try {
      const mails = await mailsApi.getAllMails();
      dispatch(fetchAllMailsSuccess(mails));
    } catch (err) {
      dispatch(fetchAllMailsError(err.message));
    }
  };
}
