import componentAction from '../types/components'

export function loginSignupDialogBoxReducer(state=null,action){
    switch(action.type){
        case componentAction.loginSignUpDialogBox:
            return {...state, box: action.payload}
            default:
              return {...state}
    }
}