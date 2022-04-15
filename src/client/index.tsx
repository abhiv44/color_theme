import React from "react"
import ReactDOM from "react-dom"
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import setAuthtoken from './config/authToken'
import rootReducer from './redux/reducers/index'
import { setCurrentUserAction } from './redux/actions/users'
import App from './app'
import axios from './config/axios'
axios.interceptors.request.use(  (req)=> {
  return req
},    (error)=> {
  return Promise.reject(error);
});
axios.interceptors.response.use(  (response) => {
  return response;
}, (error) => {

  return Promise.reject(error);
});
const root = document.getElementById('root')
const store = createStore(rootReducer, applyMiddleware(thunk))

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
try{
    if (getCookie('token')) {
      setAuthtoken(getCookie('token'))
      store.dispatch(setCurrentUserAction(getCookie('token')))
    }
  } catch(er){
    console.log(er)
  }
  

ReactDOM.render(<Provider store={store}>
<React.StrictMode>
<App />
</React.StrictMode>
</Provider>,
    root
);
