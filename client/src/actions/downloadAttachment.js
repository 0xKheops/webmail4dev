import * as types from "./actionTypes";
import { mailsApi } from "../api/mailsApi";

export const downloadAttachment = (id, filename) => {
    // download directly, there is no reducer for this action
    mailsApi.downloadAttachment(id, filename);
  
    // trace an action for the hell of it :)
    return {
      type: types.GET_ATTACHMENT,
      id,
      filename
    };
  };
  