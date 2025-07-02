import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Container, Paper, Box } from '@mui/material';
import Toolbar from './components/Toolbar';
import JsonInput from './components/JsonInput';
import ErrorAlert from './components/ErrorAlert';
import JsonTreeView from './components/JsonTreeView';
import JsonTextView from './components/JsonTextView';
import theme from './theme';

function App() {
  const [jsonText, setJsonText] = useState('');
  const [jsonObj, setJsonObj] = useState(null);
  const [error, setError] = useState('');
  const [view, setView] = useState('tree'); // 'tree' or 'text'

  const handleParse = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonObj(parsed);
      setError('');
    } catch (e) {
      setError(e.message);
      setJsonObj(null);
    }
  };

  const handleInputChange = (text) => {
    setJsonText(text);
    setError('');
  };

  const handleFileLoad = (text) => {
    setJsonText(text);
    setError('');
    setJsonObj(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box mb={2}>
            <h1 style={{ margin: 0, fontWeight: 400 }}>JSON Viewer</h1>
          </Box>
          <Toolbar
            onParse={handleParse}
            view={view}
            setView={setView}
            disabled={!jsonText}
          />
          <JsonInput
            value={jsonText}
            onChange={handleInputChange}
            onFileLoad={handleFileLoad}
          />
          {error && <ErrorAlert message={error} />}
          {jsonObj && view === 'tree' && <JsonTreeView data={jsonObj} />}
          {jsonObj && view === 'text' && <JsonTextView data={jsonObj} />}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App; 