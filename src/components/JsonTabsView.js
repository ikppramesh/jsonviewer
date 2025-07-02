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
      <DialogTitle>JSON Diff (Side by Side)</DialogTitle>
      <DialogContent>
        {error ? (
          <div style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{error}</div>
        ) : (
          <div style={{ display: 'flex', fontFamily: 'monospace', fontSize: 14, background: '#fafafa', padding: 8, overflowX: 'auto' }}>
            <div style={{ flex: 1, borderRight: '1px solid #ddd', paddingRight: 8 }}>
              <div style={{ fontWeight: 'bold', marginBottom: 4 }}>JSON 1</div>
              {leftLines.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  backgroundColor: item && item.type === 'removed' ? '#ffecec' : item && item.type === 'unchanged' ? 'inherit' : '#fff',
                  color: item && item.type === 'removed' ? '#b31d28' : 'inherit',
                  textDecoration: item && item.type === 'removed' ? 'line-through' : 'none',
                  minHeight: 20,
                  whiteSpace: 'pre',
                  fontFamily: 'monospace'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: 32,
                    color: '#888',
                    userSelect: 'none',
                    textAlign: 'right',
                    marginRight: 8
                  }}>{item && item.line !== undefined ? idx + 1 : ''}</span>
                  <span>{item && item.line}</span>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, paddingLeft: 8 }}>
              <div style={{ fontWeight: 'bold', marginBottom: 4 }}>JSON 2</div>
              {rightLines.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  backgroundColor: item && item.type === 'added' ? '#d4fcbc' : item && item.type === 'unchanged' ? 'inherit' : '#fff',
                  color: item && item.type === 'added' ? '#22863a' : 'inherit',
                  minHeight: 20,
                  whiteSpace: 'pre',
                  fontFamily: 'monospace'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: 32,
                    color: '#888',
                    userSelect: 'none',
                    textAlign: 'right',
                    marginRight: 8
                  }}>{item && item.line !== undefined ? idx + 1 : ''}</span>
                  <span>{item && item.line}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
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
    <Box sx={{ width: '100%' }}>
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="json tabs">
        {tabs.map((tab, idx) => (
          <Tab key={idx} label={tab.label} {...a11yProps(idx)} />
        ))}
        <Button onClick={handleAddTab} sx={{ ml: 2 }} variant="outlined" size="small">+ Add</Button>
        {tabs.length >= 2 && (
          <Button onClick={handleOpenDiff} sx={{ ml: 2 }} variant="contained" size="small" color="secondary">Compare 1 & 2</Button>
        )}
      </Tabs>
      <Box sx={{ p: 2 }}>
        <Toolbar
          onParse={handleParse}
          view={tabs[activeTab].view}
          setView={handleViewChange}
          disabled={!tabs[activeTab].json}
        />
        <JsonInput value={tabs[activeTab].json} onChange={handleJsonChange} onFileLoad={handleFileLoad} />
        {tabs[activeTab].error && <ErrorAlert message={tabs[activeTab].error} />}
        {tabs[activeTab].obj && tabs[activeTab].view === 'tree' && <JsonTreeView data={tabs[activeTab].obj} />}
        {tabs[activeTab].obj && tabs[activeTab].view === 'text' && <JsonTextView data={tabs[activeTab].obj} />}
      </Box>
      <DiffDialog open={diffOpen} onClose={handleCloseDiff} jsonA={tabs[0].json} jsonB={tabs[1].json} />
    </Box>
  );
};

export default JsonTabsView;
