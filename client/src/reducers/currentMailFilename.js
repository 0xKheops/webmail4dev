const currentMailFilename = (state = null, action) => {
    switch (action.type) {
        case 'DISPLAY_MAIL':
            return action.filename;
        default:
            return state
    }
}

export default currentMailFilename
