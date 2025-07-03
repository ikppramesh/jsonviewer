// Minimal Node.js/Express proxy for LLM requests with CORS
const express = require('express');
const cors = require('cors');
// Use dynamic import for node-fetch (ESM)
let fetch;
import('node-fetch').then(mod => { fetch = mod.default; });

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Proxy endpoint: POST /llm
app.post('/llm', async (req, res) => {
  try {
    // Wait for fetch to be loaded
    if (!fetch) fetch = (await import('node-fetch')).default;
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`LLM proxy listening on http://localhost:${PORT}/llm`);
});
