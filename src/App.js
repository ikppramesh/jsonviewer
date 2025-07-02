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
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box mb={2}>
            <h1 style={{ margin: 0, fontWeight: 400 }}>JSON Viewer</h1>
          </Box>
      <JsonTabsView />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App; 