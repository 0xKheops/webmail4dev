import * as types from "./actionTypes";
import { mailsApi } from "../api/mailsApi";

const deleteMailSuccess = id => ({
  type: types.DELETE_MAIL_SUCCESS,
  id
});

export function deleteMail(id) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return async function(dispatch) {
    await mailsApi.deleteMail(id);
    dispatch(deleteMailSuccess(id));
  };
}
