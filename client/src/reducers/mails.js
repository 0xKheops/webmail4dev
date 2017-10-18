const mails = (state = [], action) => {

  console.log(action);

  switch (action.type) {
    case 'DISPLAY_MAILS':
      return [
        ...action.mails
      ];
    case 'DELETE_MAIL':
      const mailToDelete = state.find((m) => m.filename === action.filename);
      console.log("mailToDelete", mailToDelete)
      return state.filter(mail => mail.filename !== action.filename);
    case 'DELETE_MAILS':
      return [];
    default:
      return state
  }
}

export default mails
