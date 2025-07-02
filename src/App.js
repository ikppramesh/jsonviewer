import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Container, Paper, Box } from '@mui/material';
import Toolbar from './components/Toolbar';
import JsonTabsView from './components/JsonTabsView';
import theme from './theme';

function App() {
  // State and handlers removed for single JSON, now handled in JsonTabsView

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        width: '100vw',
        minHeight: '100vh',
        py: 0,
        background: '#101014',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Box sx={{
          width: '100%',
          maxWidth: 1600,
          mx: 'auto',
          p: { xs: 0, sm: 1, md: 2 },
          borderRadius: { xs: 0, md: 3 },
          boxShadow: { xs: 'none', md: '0 0 32px #00ffe7' },
          background: '#181a1b',
          border: 'none',
          minHeight: 0,
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Fira Mono, Menlo, monospace',
          color: '#e0e0e0',
        }}>
          <Box mb={2} sx={{
            borderBottom: '1.5px solid #00ffe7',
            pb: 1,
            background: '#101014',
            px: { xs: 2, sm: 3 },
            pt: 2,
            width: '100%',
            boxSizing: 'border-box',
            flexShrink: 0,
          }}>
            <h1 style={{ margin: 0, fontWeight: 400, color: '#00ffe7', letterSpacing: 1, fontFamily: 'Fira Mono, Menlo, monospace', fontSize: 24, textShadow: '0 0 8px #00ffe7', wordBreak: 'break-word' }}>
              <span style={{ color: '#00ff99', textShadow: '0 0 8px #00ff99' }}>$</span> IR Json Viewer
            </h1>
          </Box>
          <Box sx={{
            flex: 1,
            px: { xs: 1, sm: 2, md: 3 },
            pb: { xs: 1, sm: 2, md: 3 },
            pt: 0,
            color: '#e0e0e0',
            minHeight: 0,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            width: '100%',
          }}>
            <React.Suspense fallback={<div style={{color:'#00ffe7',textAlign:'center',marginTop:40}}>Loading...</div>}>
              <JsonTabsView />
            </React.Suspense>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App; 