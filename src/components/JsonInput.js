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
        minRows={10}
        fullWidth
        value={value}
        onChange={e => onChange(e.target.value)}
        variant="outlined"
        size="small"
        sx={{
          color: '#00ffe7',
          '& .MuiInputBase-root': {
            maxHeight: '60vh',
            minHeight: 120,
            overflowY: 'auto',
            background: '#0a0a0a',
            borderRadius: 2,
            border: 'none',
            boxShadow: 'none',
          },
          '& .MuiInputBase-input': {
            color: '#00ffe7',
            fontFamily: 'Fira Mono, Menlo, monospace',
            background: '#0a0a0a',
            resize: 'vertical',
            minHeight: 120,
          },
          '& .MuiInputLabel-root': { color: '#00ffe7', textShadow: '0 0 6px #00ffe7' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { border: 'none', boxShadow: 'none' },
            '&:hover fieldset': { border: 'none', boxShadow: 'none' },
            '&.Mui-focused fieldset': { border: 'none', boxShadow: 'none' },
          },
        }}
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