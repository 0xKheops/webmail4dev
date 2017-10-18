import * as types from '../actions/actionTypes';

const currentMailFilename = (state = null, action) => {
    switch (action.type) {
        case types.DISPLAY_MAIL:
            return action.filename;
        default:
            return state
    }
}

export default currentMailFilename
