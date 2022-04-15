import React, { Fragment } from 'react'
import Typography from '@mui/material/Typography'
function TypographyComponent(props){
const { 
    variant,
    label,
    className,
    display,
    gutterBottom=false 
} = props
return(<Fragment>
      <Typography variant={variant} display={display} className={className} gutterBottom={gutterBottom}>{label}</Typography>
</Fragment>)
}
export default TypographyComponent