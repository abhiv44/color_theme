import { combineReducers } from 'redux'
import { userLoginReducer, userColorPreferReducer, userPrimaryColorReducer } from './users'
import { loginSignupDialogBoxReducer } from './components'

const store = combineReducers({
    userLogin: userLoginReducer,
    loginSignupDialogBox: loginSignupDialogBoxReducer,
    userColorPrefer: userColorPreferReducer,
    userPrimaryColor: userPrimaryColorReducer
})
export default store;

export type RootState = ReturnType<typeof store>