const path = require('path');
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DEFAULT_USERNAME = process.env.GITHUB_USERNAME || 'PatrickRucareanGeorge';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.use(express.static(path.join(__dirname)));

app.get('/api/repos', async (req, res) => {
  const username = req.query.username || DEFAULT_USERNAME;
  const url = `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=pushed`;

  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-proxy',
  };

  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'GitHub API error' });
    }

    return res.json(data);
  } catch (error) {
    return res.status(502).json({ error: 'Gateway error while fetching GitHub repositories.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server proxy GitHub rulează pe http://localhost:${PORT}`);
});
