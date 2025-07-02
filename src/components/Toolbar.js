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
      >
        <ToggleButton value="tree" aria-label="Tree View">
          <FormatListBulletedIcon /> Tree
        </ToggleButton>
        <ToggleButton value="text" aria-label="Text View">
          <CodeIcon /> Text
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}

export default Toolbar; 