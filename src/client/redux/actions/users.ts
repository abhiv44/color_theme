import axios from '../../config/axios'
import setAuthtoken from '../../config/authToken'
import userAction from '../types/users'
import {loginSignupDialogBoxAction} from './components'
import { routes } from '../../config/basePath'

export const userLoginAction = (userName, password)=> async dispatch =>{
    try {
        dispatch({type: userAction.userLoginLoading})
        const res = await axios.post(`${routes.login}`, {userName, password})
        const { token } =  res.data
        if(token){
            document.cookie = `token=${token}`
            setAuthtoken(token);
            dispatch(setCurrentUserAction(token))
            dispatch(loginSignupDialogBoxAction(false))
        }
    } catch(err){
        console.log(err)
    }
}

export const setCurrentUserAction =(e)=>{
    return {
        type: userAction.userLogin,
        payload: e
}
}
 
export const userLogoutAction = () => {
 function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
 function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime((exdays * 60));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires;
}
     setCookie('token', getCookie('token'), -1)
    setAuthtoken(false);
    return { type: userAction.userLogout }
}


export const colorPreferAction = (color) => async dispatch => {
try {
dispatch({type: userAction.colorPreferLoading})
const res = await axios.post(routes.colorPrefer, {color})
dispatch({type: userAction.colorPrefer, payload: res.data})
} catch(er){
console.log('something went wrong')
}
}

export const colorPimaryAction = () => async dispatch => {
try {
const res = await axios.post(routes.colorPrimary)
dispatch({type: userAction.userPrimaryColor, payload: res.data})
} catch(er){
console.log('something went wrong')
}
}