import React from 'react';
import IconButton from "@mui/material/IconButton/IconButton.js";
import Snackbar from "@mui/material/Snackbar/Snackbar.js";
import CloseIcon from '@mui/icons-material/Close.js';

export default function SnackBar({
  open,
  message,
  autoHideDuration = 3000,
  anchor = { horizontal: 'right', vertical: 'bottom' },
  onClose,
  status,
}) {
  return (
    <Snackbar
      open={open} message={message} autoHideDuration={autoHideDuration}
      anchorOrigin={anchor}
      onClose={() => onClose(status)}
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
