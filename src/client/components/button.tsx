import React, { Fragment } from 'react'
import Button from '@mui/material/Button'

const btnColorsContained = {
    primary: 'primary-contained',
    secondary: 'secondary-contained'
}

const btnColorsOutlined ={
    primary :'primary-outlined',
    secondary: 'secondary-outlined'
}
function Buttons(props){
    const { color, label, variant, onClick, onChange, type, disabled, href, size } = props
    return (<Fragment>
{
variant =='contained' && <Button 
type={type}
className={btnColorsContained[color]} 
variant='contained' 
onClick={onClick} 
onChange={onChange} 
disabled={disabled}
href={href}
size={size}
>{label}</Button> || 
variant=='outlined' && <Button 
type={type}
className={btnColorsOutlined[color]} 
variant='outlined' 
onClick={onClick} 
onChange={onChange} 
disabled={disabled}
href={href}
size={size}
>{label}</Button> ||
 <Button 
className={btnColorsContained[color]}
onClick={onClick} 
onChange={onChange} 
disabled={disabled}
href={href}
size={size}
>{label}</Button>
}

    </Fragment>)
}
export default Buttons