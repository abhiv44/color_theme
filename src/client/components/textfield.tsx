import React from 'react'
import TextField from '@mui/material/TextField'

function Textfield(props){
    const {id, required, label, defaultValue, error, type, className} = props
return(<TextField
   className='textfield'
    error={error}
    required ={required}
    id={id}
    label={label}
    type={type}
    defaultValue={defaultValue}
    variant='outlined'
    {...props}
  />)
}
export default Textfield