import * as types from "../actions/actionTypes";
import { notifyEmailReceived } from "../utilities/notifications";
import * as moment from "moment";

const mails = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_ALL_MAILS_SUCCESS:
      return [...action.mails];

    case types.DELETE_ONE_MAIL_SUCCESS:
      return state.filter(mail => mail._id !== action.id);

    case types.RECEIVED_MAIL:
      notifyEmailReceived(action.mail);

      return [action.mail, ...state];

    case types.DELETE_ALL_MAILS_SUCCESS:
      return [];

    case types.FETCH_ONE_MAIL_REQUEST:
      return state.map((mail, idx) => {
        if (mail._id !== action.id) return mail;

        //overwrite all properties with the full mail object
        return {
          ...mail,
          loading: true
        };
      });

    case types.FETCH_ONE_MAIL_ERROR:
    return state.map((mail, idx) => {
      if (mail._id !== action.id) return mail;

      //overwrite all properties with the full mail object
      return {
        ...mail,
        ...action.mail,
        loaded: true,
        loading: false,
        error: action.message
      };
    });

    case types.FETCH_ONE_MAIL_SUCCESS:
      return state.map((mail, idx) => {
        if (mail._id !== action.mail._id) return mail;

        //overwrite all properties with the full mail object
        return {
          ...mail,
          ...action.mail,
          loaded: true,
          loading: false,
          error: null
        };
      });

    default:
      return state;
  }
};

export default mails;
