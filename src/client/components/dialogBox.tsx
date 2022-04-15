import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';

function DialogBox(props){
  const {open = false, handleClose, title, content,maxWidth, action, divider, classNameDialogContent, enableCloseIcon } = props
return(<Dialog fullWidth maxWidth={maxWidth} onClose={handleClose} open={open} className='dialog-box'>
  <DialogTitle> 
  {title}
  {enableCloseIcon ? (
        <IconButton
          aria-label="close"
          onClick={enableCloseIcon}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
  </DialogTitle>
  <DialogContent dividers={divider} className={classNameDialogContent}>
    {content}
  </DialogContent>
  <DialogActions>
{action}
  </DialogActions>
      </Dialog>
)}
export default DialogBox