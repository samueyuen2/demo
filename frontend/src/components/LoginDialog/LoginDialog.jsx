// React
import { useState } from 'react'

// MUI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

function LoginDialog(props) {

  return (
    <Dialog
      open={open}
    >
      <DialogTitle >
        Not logged in
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Press Continue to Login
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props?.onClick}
          variant='contained'
          autoFocus
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoginDialog
