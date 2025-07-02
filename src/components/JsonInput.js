import React, { useRef } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';

function JsonInput({ value, onChange, onFileLoad }) {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      onFileLoad(evt.target.result);
    };
    reader.readAsText(file);
    fileInputRef.current.value = '';
  };

  return (
    <Stack direction="row" spacing={2} alignItems="flex-start" mb={2}>
      <TextField
        label="Paste or type JSON here"
        multiline
        minRows={6}
        maxRows={16}
        fullWidth
        value={value}
        onChange={e => onChange(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ flex: 1 }}
      />
      <Box>
        <input
          type="file"
          accept="application/json,.json,.txt"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button
          variant="outlined"
          onClick={() => fileInputRef.current.click()}
          sx={{ mt: 1 }}
        >
          Load File
        </Button>
      </Box>
    </Stack>
  );
}

export default JsonInput; 