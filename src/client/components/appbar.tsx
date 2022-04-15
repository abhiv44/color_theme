import React, { Fragment, useState, memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {AppBar, Toolbar} from '@mui/material'
import Typography from './typography'
import DialogBox from './dialogBox'
import Button from './button'
import {useInputString} from './input'
import Loader from './loader'
import Textfield from './textfield'
import validation from '../config/functions'
import {Tabs, Tab} from '@mui/material';
import { userLoginAction, userLogoutAction, colorPreferAction, colorPimaryAction} from '../redux/actions/users'
import { loginSignupDialogBoxAction } from '../redux/actions/components'
import type { RootState } from '../redux/reducers'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
function Appbar(){

  const dispatch = useDispatch()
  const [selectedValue, setSelectedValue] = useState('#006064');
  const theme = createTheme({
  palette: {
    primary: {
      main: selectedValue,
    },
  },
});

  const handleChangeColor = (event) => {
  dispatch(colorPreferAction(event.target.value))
  setSelectedValue(event.target.value)
  };
const [value, setValue] = useState('login');
const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    const {value: userNameLogin, bind: bindUserNameLogin, reset:resetUserNameLogin} = useInputString('')
    const {value: passwordLogin, bind: bindPasswordLogin, reset:resetPasswordLogin} = useInputString('')

    const userLogin = useSelector((state: RootState) => state.userLogin)
    const colorPrimary = useSelector((state: RootState) => state.userPrimaryColor)
    const userColorPrefer = useSelector((state: RootState) => state.userColorPrefer)
    const { clr='' } = userColorPrefer
    const { color='' } = colorPrimary
    const { loading, isAuthenticated } = userLogin

    const loginSignUpDialogBox = useSelector((state: RootState) => state.loginSignupDialogBox)

useEffect(()=> {
if(color)setSelectedValue(color)
if(clr) setSelectedValue(clr)
 if(isAuthenticated){
 dispatch(colorPimaryAction())
 }
},[selectedValue, isAuthenticated, color, clr])
  const handleOpenDialogBox = () => {  dispatch(loginSignupDialogBoxAction(true))  };

  const handleCloseDialogBox = () => { 
    dispatch(loginSignupDialogBoxAction(false))
    handleResetLogin()
  }
  const handleResetLogin = () => {
    resetUserNameLogin()
    resetPasswordLogin()
  }


  const handleLoginSubmit = (e)=>{
    e.preventDefault()
    dispatch(userLoginAction(userNameLogin, passwordLogin))
}

const handleLogout= ()=>{
  dispatch(userLogoutAction())
  handleResetLogin()
}
  const loginForm = <div className='login'>
 <form onSubmit={handleLoginSubmit}>
  <Textfield type='text' error={ userNameLogin.length > 0 && !validation.formValidation.userName(userNameLogin)} required label='Enter Username' {...bindUserNameLogin}/>
  <Textfield type='password' error={!validation.formValidation.password(passwordLogin)} required label='Enter Password' {...bindPasswordLogin}/>
{loading && <Loader/>}
  <Button variant='contained' disabled={ loading || !userNameLogin || !passwordLogin || userNameLogin.includes(' ') || passwordLogin.includes(' ')} type='submit' color='primary' label='Login'/>
  <Button variant='outlined' onClick={handleResetLogin} disabled={loading}  color='primary' label='Reset'/>
      </form>
  </div>
return (<Fragment>
<ThemeProvider theme={theme}>
    <AppBar position="sticky" id='appbar' color='primary'>
        <Toolbar className='toolbar'>
        <div className='left'>
        <a href='/'>
          <Typography variant='h6' label='My Color Theme'/>
        </a>
        </div>
          { isAuthenticated ? <Fragment>
        <Select
        className='select-box'
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label="Age"
          onChange={handleChangeColor}
        >
          <MenuItem value='#006064'>Primary</MenuItem>
          <MenuItem value='#ec407a'>Secondary</MenuItem>
        </Select>
  
          <Button color='primary' size='small' onClick={handleLogout}  variant='contained' label='Logout'/>
            </Fragment>
            :<Button color='primary' size='small' variant='contained' label='Login' onClick={handleOpenDialogBox}/> }
           <DialogBox 
           maxWidth='sm'
           enableCloseIcon={handleCloseDialogBox}
            classNameDialogContent='dialogBoxContentLoginSignup' 
            disableEscapeKeyDown={true}
            open={loginSignUpDialogBox.box || false}
            title={<Tabs
        value={value}
        onChange={handleChange}
       // variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs"
      >
      <Tab value='login' label="Login" />
      </Tabs>} 
            content={<Fragment>
              {value == 'login' && loginForm}
              </Fragment>}
              />
        </Toolbar>
      </AppBar>
      </ThemeProvider>
</Fragment>)
}
export default memo(Appbar)