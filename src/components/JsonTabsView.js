import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab } from '@mui/material';
import JsonInput from './JsonInput';
import JsonTextView from './JsonTextView';
import JsonTreeView from './JsonTreeView';
import Toolbar from './Toolbar';
import ErrorAlert from './ErrorAlert';
import { diffLines } from 'diff';


function a11yProps(index) {
  return {
    id: `json-tab-${index}`,
    'aria-controls': `json-tabpanel-${index}`
  };
}
const DiffDialog = ({ open, onClose, jsonA, jsonB }) => {
  let left = '';
  let right = '';
  let error = '';
  try {
    // Always beautify input JSONs for diff
    const leftObj = JSON.parse(jsonA);
    left = JSON.stringify(leftObj, null, 2);
  } catch (e) {
    error = 'Left JSON invalid: ' + e.message;
  }
  try {
    const rightObj = JSON.parse(jsonB);
    right = JSON.stringify(rightObj, null, 2);
  } catch (e) {
    error = (error ? error + '\n' : '') + 'Right JSON invalid: ' + e.message;
  }
  let diff = [];
  if (!error) {
    diff = diffLines(left, right);
  }

  // Prepare side-by-side lines
  let leftLines = [];
  let rightLines = [];
  if (!error) {
    diff.forEach(part => {
      const lines = part.value.split('\n');
      // Remove last empty line if present
      if (lines[lines.length - 1] === '') lines.pop();
      lines.forEach(line => {
        if (part.added) {
          leftLines.push('');
          rightLines.push({ line, type: 'added' });
        } else if (part.removed) {
          leftLines.push({ line, type: 'removed' });
          rightLines.push('');
        } else {
          leftLines.push({ line, type: 'unchanged' });
          rightLines.push({ line, type: 'unchanged' });
        }
      });
    });
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{
        background: '#101014',
        color: '#00ffe7',
        fontWeight: 700,
        textShadow: '0 0 8px #00ffe7',
        borderBottom: '2px solid #00ffe7',
      }}>JSON Diff (Side by Side)</DialogTitle>
      <DialogContent sx={{ background: '#181a1b', p: 0 }}>
        {error ? (
          <div style={{ color: '#ff00cc', whiteSpace: 'pre-wrap', padding: 16 }}>{error}</div>
        ) : (
          <div style={{ display: 'flex', fontFamily: 'Fira Mono, Menlo, monospace', fontSize: 14, background: '#181a1b', padding: 8, overflowX: 'auto', color: '#00ffe7' }}>
            <div style={{ flex: 1, borderRight: '2px solid #00ffe7', paddingRight: 12 }}>
              <div style={{ fontWeight: 'bold', marginBottom: 4, color: '#00ffe7', textShadow: '0 0 8px #00ffe7' }}>JSON 1</div>
              {leftLines.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  backgroundColor: item && item.type === 'removed' ? '#2d1a1a' : item && item.type === 'unchanged' ? 'inherit' : '#181a1b',
                  color: item && item.type === 'removed' ? '#ff00cc' : '#00ffe7',
                  textDecoration: item && item.type === 'removed' ? 'line-through' : 'none',
                  minHeight: 20,
                  whiteSpace: 'pre',
                  fontFamily: 'Fira Mono, Menlo, monospace',
                  fontWeight: item && item.type === 'removed' ? 700 : 500,
                  textShadow: item && item.type === 'removed' ? '0 0 8px #ff00cc' : '0 0 4px #00ffe7',
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: 32,
                    color: '#00ff99',
                    userSelect: 'none',
                    textAlign: 'right',
                    marginRight: 8,
                    textShadow: '0 0 6px #00ff99',
                  }}>{item && item.line !== undefined ? idx + 1 : ''}</span>
                  <span>{item && item.line}</span>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, paddingLeft: 12 }}>
              <div style={{ fontWeight: 'bold', marginBottom: 4, color: '#00ffe7', textShadow: '0 0 8px #00ffe7' }}>JSON 2</div>
              {rightLines.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  backgroundColor: item && item.type === 'added' ? '#1a2d1a' : item && item.type === 'unchanged' ? 'inherit' : '#181a1b',
                  color: item && item.type === 'added' ? '#00ff99' : '#00ffe7',
                  minHeight: 20,
                  whiteSpace: 'pre',
                  fontFamily: 'Fira Mono, Menlo, monospace',
                  fontWeight: item && item.type === 'added' ? 700 : 500,
                  textShadow: item && item.type === 'added' ? '0 0 8px #00ff99' : '0 0 4px #00ffe7',
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: 32,
                    color: '#00ff99',
                    userSelect: 'none',
                    textAlign: 'right',
                    marginRight: 8,
                    textShadow: '0 0 6px #00ff99',
                  }}>{item && item.line !== undefined ? idx + 1 : ''}</span>
                  <span>{item && item.line}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions sx={{
        background: '#101014',
        borderTop: '2px solid #00ffe7',
        boxShadow: '0 -2px 12px #00ffe744',
        p: 2,
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <Button 
          onClick={onClose}
          sx={{
            color: '#101014',
            background: 'linear-gradient(90deg, #00ffe7 0%, #00ff99 100%)',
            fontWeight: 700,
            textShadow: '0 0 8px #00ffe7',
            borderRadius: 2,
            px: 3,
            boxShadow: '0 0 8px #00ffe7',
            '&:hover': {
              background: 'linear-gradient(90deg, #00ff99 0%, #00ffe7 100%)',
              color: '#101014',
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}


const JsonTabsView = () => {
  const [tabs, setTabs] = useState([
    { label: 'JSON 1', json: '', obj: null, error: '', view: 'tree' },
    { label: 'JSON 2', json: '', obj: null, error: '', view: 'tree' },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [diffOpen, setDiffOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleJsonChange = (value) => {
    setTabs((prev) => {
      const updated = [...prev];
      updated[activeTab] = {
        ...updated[activeTab],
        json: value,
        error: '',
        obj: null,
      };
      return updated;
    });
  };

  const handleFileLoad = (value) => {
    setTabs((prev) => {
      const updated = [...prev];
      updated[activeTab] = {
        ...updated[activeTab],
        json: value,
        error: '',
        obj: null,
      };
      return updated;
    });
  };

  const handleParse = () => {
    setTabs((prev) => {
      const updated = [...prev];
      try {
        const parsed = JSON.parse(updated[activeTab].json);
        updated[activeTab] = {
          ...updated[activeTab],
          obj: parsed,
          error: '',
        };
      } catch (e) {
        updated[activeTab] = {
          ...updated[activeTab],
          obj: null,
          error: e.message,
        };
      }
      return updated;
    });
  };

  const handleViewChange = (view) => {
    setTabs((prev) => {
      const updated = [...prev];
      updated[activeTab] = {
        ...updated[activeTab],
        view,
      };
      return updated;
    });
  };

  const handleAddTab = () => {
    setTabs((prev) => [...prev, { label: `JSON ${prev.length + 1}`, json: '' }]);
    setActiveTab(tabs.length);
  };

  const handleOpenDiff = () => {
    setDiffOpen(true);
  };

  const handleCloseDiff = () => {
    setDiffOpen(false);
  };

  return (
    <Box sx={{ width: '100%', color: '#fff' }}>
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="json tabs" sx={{ color: '#fff',
        '& .MuiTab-root': { color: '#fff' },
        '& .Mui-selected': { color: '#fff', fontWeight: 700 },
        '& .MuiTabs-indicator': { backgroundColor: '#fff' },
      }}>
        {tabs.map((tab, idx) => (
          <Tab key={idx} label={tab.label} {...a11yProps(idx)} />
        ))}
        <Button onClick={handleAddTab} sx={{ ml: 2 }} variant="outlined" size="small">+ Add</Button>
        {tabs.length >= 2 && (
          <Button onClick={handleOpenDiff} sx={{ ml: 2 }} variant="contained" size="small" color="secondary">Compare 1 & 2</Button>
        )}
      </Tabs>
      <Box sx={{
        p: 2,
        display: 'flex',
        gap: 2,
        color: '#fff',
        flexDirection: { xs: 'column', md: 'row' },
        height: '100%',
        minHeight: 0,
        maxHeight: '100%',
        flex: 1,
        overflow: 'hidden',
      }}>
        <Box sx={{
          flex: 1,
          minWidth: 0,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'auto',
        }}>
          <Toolbar
            onParse={handleParse}
            view={tabs[activeTab].view}
            setView={handleViewChange}
            disabled={!tabs[activeTab].json}
          />
          <JsonInput
            value={tabs[activeTab].json}
            onChange={handleJsonChange}
            onFileLoad={handleFileLoad}
            sx={{
              flex: 1,
              height: '100%',
              minHeight: 0,
              maxHeight: '100%',
              overflow: 'auto',
              '& textarea': {
                minHeight: 0,
                height: '100%',
                maxHeight: '100%',
                resize: 'none',
              },
            }}
          />
        </Box>
        <Box sx={{
          flex: 1,
          minWidth: 0,
          color: '#fff',
          height: '100%',
          overflow: 'auto',
        }}>
          {tabs[activeTab].error && <ErrorAlert message={tabs[activeTab].error} />}
          {tabs[activeTab].obj && tabs[activeTab].view === 'tree' && <JsonTreeView data={tabs[activeTab].obj} />}
          {tabs[activeTab].obj && tabs[activeTab].view === 'text' && <JsonTextView data={tabs[activeTab].obj} />}
        </Box>
      </Box>
      <DiffDialog open={diffOpen} onClose={handleCloseDiff} jsonA={tabs[0].json} jsonB={tabs[1].json} />
    </Box>
  );
};

export default JsonTabsView;
