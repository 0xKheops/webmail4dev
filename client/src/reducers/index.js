import { combineReducers } from 'redux'
import mails from './mails'
//import currentMailFilename from './currentMailFilename'
import ui from './ui'

// const sample2 = {
//   ui:{
//     appTitle:"",
//     currentMailId:"",
//     error:""
//   },
//   mails:[
//     {
//       id:"",
//       from:{},
//       subject:{},
//       loaded:false,
//       loading:false,
//       read:false,
//     },
//     {
//       id:"",
//       from:{},
//       to:{},
//       subject:{},
//       html:"",
//       loaded:true,
//       loading:false,
//       read:true,
//     }
//   ],
// }

const todoApp = combineReducers({
  mails,
 // currentMailFilename,
  ui
})

export default todoApp
