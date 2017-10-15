import { combineReducers } from 'redux'
import mails from './mails'
import currentMailFilename from './currentMailFilename'

const todoApp = combineReducers({
  mails,
  currentMailFilename
})

export default todoApp
