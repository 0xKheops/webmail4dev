import * as types from "./actionTypes";
import { mailsApi } from "../api/mailsApi";

const displayMailsSuccess = mails => ({
  type: types.DISPLAY_MAILS_SUCCESS,
  mails
});

export function fetchMails() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return async function(dispatch) {
    const mails = await mailsApi.getAllMails();
    dispatch(displayMailsSuccess(mails));
  };
}
