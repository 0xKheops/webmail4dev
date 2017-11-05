import * as types from '../actions/actionTypes';
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

    default:
      return state;

  }
}

export default mails
