import * as types from "../actions/actionTypes";

const initialState = {
  appTitle: "webmail4dev",
  mailId: null,
  error: null
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case types.DISPLAY_MAIL:
      return {
        ...state,
        mailId: action.id
      };

    case types.DISPLAY_MAILS_SUCCESS:
      return {
        ...state,
        mailId: action.mails.length === 0 ? null : action.mails[0]._id
      };

    case types.DELETE_MAIL_SUCCESS:
      return state === action.id ? null : state;

    case types.DELETE_MAILS_SUCCESS:
      return null;

    default:
      return state;
  }
};

export default ui;
