import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: '25mb' }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Health check endpoint for Google Cloud Run
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy', app: 'AgriN-Connect' });
});

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌾 AgriN-Connect Cloud Run server listening on port ${PORT}`);
});
