import React from 'react';
import { Box, Paper } from '@mui/material';

function JsonTextView({ data }) {
  return (
    <Box mt={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper 
        variant="outlined" 
        sx={{
          p: 2,
          background: '#181a1b',
          color: '#00ffe7',
          fontFamily: 'Fira Mono, Menlo, monospace',
          fontSize: 15,
          height: '100%',
          minHeight: 0,
          boxShadow: '0 0 16px #00ffe7',
          border: '2px solid #00ffe7',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
          <pre style={{
            margin: 0,
            color: '#00ffe7',
            background: 'transparent',
            fontWeight: 500,
            minHeight: 0,
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </Box>
      </Paper>
    </Box>
  );
}

export default JsonTextView; 