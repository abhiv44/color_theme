import userAction from '../types/users'
import {isEmpty} from '../../config/functions'

export function userLoginReducer(state=null,action){
    switch(action.type){
        case userAction.userLoginLoading:
            return{...state,loading:true}
        case userAction.userLogin:
            return{...state,isAuthenticated: !isEmpty(action.payload), loading:false}
            case userAction.userLogout:
      return { ...state, isAuthenticated: false, loading: false }
            default:
                return {...state}
    }
}

export function userColorPreferReducer(state=null,action){
    switch(action.type){
        case userAction.colorPreferLoading:
            return{...state,loading:true}
        case userAction.colorPrefer:
            return{...state, clr: action.payload, loading:false}
            default:
                return {...state}
    }
}

export function userPrimaryColorReducer(state=null,action){
    switch(action.type){
        case userAction.userPrimaryColor:
            return{...state, color: action.payload}
            default:
                return {...state}
    }
}