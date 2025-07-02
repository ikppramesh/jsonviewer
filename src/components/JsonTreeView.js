import React from 'react';
import { JSONTree } from 'react-json-tree';
import { Box } from '@mui/material';

const theme = {
  scheme: 'neon',
  author: 'custom',
  base00: '#181a1b', // background
  base01: '#222',
  base02: '#222',
  base03: '#444',
  base04: '#00ffe7', // brackets
  base05: '#fff', // main text
  base06: '#00ff99', // keys
  base07: '#fff',
  base08: '#ff00cc', // string
  base09: '#ffe600', // number
  base0A: '#00ff99', // boolean
  base0B: '#00ffe7', // null
  base0C: '#00ffe7',
  base0D: '#00ff99', // arrays
  base0E: '#00ffe7',
  base0F: '#fff',
};

const squareStyle = {
  display: 'inline-block',
  width: 18,
  height: 18,
  border: '2px solid #00ffe7',
  borderRadius: 2,
  background: '#101014',
  color: '#00ffe7',
  fontWeight: 'bold',
  fontSize: 14,
  textAlign: 'center',
  lineHeight: '14px',
  marginRight: 6,
  cursor: 'pointer',
  boxShadow: '0 0 6px #00ffe7',
  userSelect: 'none',
};

function SquarePlus() {
  return <span style={squareStyle}>+</span>;
}
function SquareMinus() {
  return <span style={squareStyle}>–</span>;
}

function JsonTreeView({ data }) {
  return (
    <Box mt={2} sx={{ color: '#00ffe7', fontWeight: 500, background: '#181a1b', borderRadius: 1, p: 1 }}>
      <JSONTree
        data={data}
        theme={theme}
        invertTheme={false}
        hideRoot={true}
        shouldExpandNodeInitially={(keyPath, data, level) => level < 2}
        getItemString={(type, data, itemType, itemString) => null}
        // Custom expand/collapse icons
        expandArrow={({ expanded }) => expanded ? <SquareMinus /> : <SquarePlus />}
        style={{ fontFamily: 'Fira Mono, Menlo, monospace', fontSize: 15 }}
      />
    </Box>
  );
}

export default JsonTreeView;