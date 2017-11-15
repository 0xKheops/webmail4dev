import * as types from "./actionTypes";
import { mailsApi } from "../api/mailsApi";

const deleteOneMailRequest = (id) => ({
  type: types.DELETE_ONE_MAIL_REQUEST,
  id
});

const deleteOneMailSuccess = (id) => ({
  type: types.DELETE_ONE_MAIL_SUCCESS,
  id
});

const deleteOneMailError = (message) => ({
  type: types.DELETE_ONE_MAIL_ERROR,
  message
});

export function deleteOneMail(id) {
  return async function(dispatch) {
    dispatch(deleteOneMailRequest(id));

    try {
      await mailsApi.deleteOneMail(id);
      dispatch(deleteOneMailSuccess(id));
    } catch (err) {
      dispatch(deleteOneMailError(err.message));
    }
  };
}
