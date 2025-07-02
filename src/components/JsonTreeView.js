import React from 'react';
import { JsonViewer } from '@textea/json-viewer';
import { Box } from '@mui/material';

function JsonTreeView({ data }) {
  return (
    <Box mt={2}>
      <JsonViewer value={data} defaultInspectDepth={2} />
    </Box>
  );
}

export default JsonTreeView; 