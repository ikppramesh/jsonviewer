import React from 'react';
import { Box, Button, ToggleButton, ToggleButtonGroup, Stack } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CodeIcon from '@mui/icons-material/Code';

function Toolbar({ onParse, view, setView, disabled }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={onParse}
        disabled={disabled}
      >
        Parse / Format
      </Button>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(_, val) => val && setView(val)}
        size="small"
        aria-label="view mode"
        sx={{
          '& .MuiToggleButton-root': {
            color: '#00ffe7',
            borderColor: '#00ffe7',
            background: '#181a1b',
            transition: 'all 0.2s',
          },
          '& .Mui-selected': {
            color: '#101014',
            background: 'linear-gradient(90deg, #00ffe7 0%, #00ff99 100%)',
            fontWeight: 700,
            boxShadow: '0 0 8px #00ffe7',
            borderColor: '#00ff99',
          },
        }}
      >
        <ToggleButton value="tree" aria-label="Tree View">
          <FormatListBulletedIcon sx={{ color: view === 'tree' ? '#101014' : '#00ffe7', textShadow: view === 'tree' ? '0 0 8px #00ffe7' : 'none' }} /> Tree
        </ToggleButton>
        <ToggleButton value="text" aria-label="Text View">
          <CodeIcon sx={{ color: view === 'text' ? '#101014' : '#00ffe7', textShadow: view === 'text' ? '0 0 8px #00ffe7' : 'none' }} /> Text
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}

export default Toolbar; 