const mails = (state = [], action) => {

  console.log(action);

  switch (action.type) {
    case 'DISPLAY_MAILS':
      return [
        ...state,
        ...action.mails
      ];
    case 'DELETE_MAIL':
      return state.filter(mail => mail.filename !== action.filename);
    default:
      return state
  }
}

export default mails
