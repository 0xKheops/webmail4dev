
export const displayMails = (mails) => ({
    type: 'DISPLAY_MAILS',
    mails
})

export const displayMail = (filename) => ({
    type: 'DISPLAY_MAIL',
    filename
})

export const deleteMail = (filename) => ({
    type: 'DELETE_MAIL',
    filename
})

export const deleteAllMails = (filename) => ({
    type: 'DELETE_MAILS'
})


export const REQUEST_MAILS = 'REQUEST_MAILS'
function requestMails() {
  return {
    type: REQUEST_MAILS,
  }
}

export const RECEIVE_MAILS = 'RECEIVE_MAILS'
function receiveMails(json) {
  return {
    type: RECEIVE_MAILS,
    mails: json,
    receivedAt: Date.now()
  }
}

// function shouldFetchMails(state) {
//     const mails = state.mails;
//     if (!mails) {
//       return true
//     } else if (mails.isFetching) {
//       return false
//     } else {
//       return mails.didInvalidate
//     }
//   }

export function fetchMails(){
    return dispatch => {
        dispatch(requestMails());
        return fetch("/api/mails")
        .then(response => response.json())
        .then(json => dispatch(receiveMails(json)))
    }
}
