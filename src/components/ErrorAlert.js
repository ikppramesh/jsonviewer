import React from 'react';
import { Alert } from '@mui/material';

function ErrorAlert({ message }) {
  return (
    <Alert severity="error" sx={{ my: 2 }}>
      {message}
    </Alert>
  );
}

export default ErrorAlert; 