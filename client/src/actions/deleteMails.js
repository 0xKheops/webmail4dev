import * as types from "./actionTypes";
import { mailsApi } from "../api/mailsApi";

const deleteMailsSuccess = () => ({
  type: types.DELETE_MAILS_SUCCESS
});

export function deleteMails() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return async function(dispatch) {
    await mailsApi.deleteMails();
    dispatch(deleteMailsSuccess());
  };
}
