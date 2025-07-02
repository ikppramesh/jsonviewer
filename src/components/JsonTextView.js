import React from 'react';
import { Box, Paper } from '@mui/material';

function JsonTextView({ data }) {
  return (
    <Box mt={2}>
      <Paper variant="outlined" sx={{ p: 2, background: '#fafafa', fontFamily: 'monospace', fontSize: 14, overflowX: 'auto' }}>
        <pre style={{ margin: 0 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </Paper>
    </Box>
  );
}

export default JsonTextView; 