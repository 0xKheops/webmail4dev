import * as types from "../actions/actionTypes";
import { notifyEmailReceived } from "../utilities/notifications";

const mails = (state = [], action) => {
  switch (action.type) {
    case types.DISPLAY_MAILS_SUCCESS:
      return [...action.mails];

    case types.DELETE_MAIL_SUCCESS:
      return state.filter(mail => mail._id !== action.filename);

    case types.RECEIVED_MAIL:
      notifyEmailReceived(action.mail);
      return [action.mail, ...state];

    case types.DELETE_MAILS_SUCCESS:
      return [];

    case types.FETCH_MAIL_REQUEST:
      return state.map((mail, idx) => {
        if (mail._id !== action.id) return mail;

        //overwrite all properties with the full mail object
        return {
          ...mail,
          loading: true
        };
      });

    case types.FETCH_MAIL_SUCCESS:
      return state.map((mail, idx) => {
        if (mail._id !== action.mail._id) return mail;

        //overwrite all properties with the full mail object
        return {
          ...mail,
          ...action.mail,
          loaded: true,
          loading: false
        };
      });

    case types.FETCH_MAIL_FAILURE:
      return state.map((mail, idx) => {
        if (mail._id !== action.mail._id) return mail;

        //overwrite all properties with the full mail object
        return {
          ...mail,
          loading: false,
          error: action.error
        };
      });

    default:
      return state;
  }
};

export default mails;
