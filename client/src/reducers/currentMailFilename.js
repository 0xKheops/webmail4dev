import * as types from '../actions/actionTypes';

const currentMailFilename = (state = null, action) => {
    switch (action.type) {
        case types.DISPLAY_MAILS_SUCCESS:
            return action.mails.length === 0 ? null : action.mails[0].filename;
        case types.DISPLAY_MAIL:
            return action.filename;
        default:
            return state
    }
}

export default currentMailFilename
