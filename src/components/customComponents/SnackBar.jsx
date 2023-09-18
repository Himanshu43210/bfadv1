import React from 'react';
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function SnackBar({
    open = false,
    message,
    autoHideDuration = 3000,
    anchor = {horizontal: 'right', vertical: 'bottom'},
    onClose
}) {
  return (
    <Snackbar
        open={open} message={message} autoHideDuration={autoHideDuration}
        anchorOrigin={anchor}
        onClose={onClose}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
  )
}
