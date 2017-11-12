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

    case types.FETCH_ALL_MAILS_SUCCESS:
      return {
        ...state,
        mailId: action.mails.length === 0 ? null : action.mails[0]._id
      };

    case types.DELETE_ONE_MAIL_SUCCESS:
      return {
        ...state,
        mailId: state.mailId === action.id ? null : state.mailId
      };

    case types.DELETE_ALL_MAILS_SUCCESS:
      return {
        ...state,
        mailId: null
      };

    case types.DELETE_ALL_MAILS_ERROR:
    case types.FETCH_ALL_MAILS_ERROR:
    case types.DELETE_ONE_MAIL_ERROR:
    case types.FETCH_ONE_MAIL_ERROR:
      //console.error(action.type, action.error);

      return {
        ...state,
        error: action.message
      };

    default:
      return state;
  }
};

export default ui;
