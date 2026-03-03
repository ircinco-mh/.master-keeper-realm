const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { WorkerEngine } = require('./worker-engine');

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = '738a48d70ba3ddc859e628b6bee5eba7';
const KANO_API = 'https://kano.is/index.php';

// Security middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Enforce identity separation
  if (req.headers.authorization && req.headers.authorization.includes('ircinco-mh')) {
    return res.status(403).json({ error: 'GitHub identity detected in Kano request' });
  }
  
  next();
});

// Game-integrated API proxy
app.get('/api/workers', async (req, res) => {
  try {
    const response = await axios.get(KANO_API, {
      params: {
        k: 'api',
        username: 'Appleseed',
        api: API_KEY,
        json: 'y',
        work: 'y'
      }
    });
    
    const workerEngine = new WorkerEngine(response.data);
    const gameData = workerEngine.getGameData();
    
    res.json({
      timestamp: new Date().toISOString(),
      realmHealth: gameData.health,
      workers: gameData.workers,
      totalHashrate: gameData.totalHashrate
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to connect to Kano API',
      details: error.message 
    });
  }
});

// Key management endpoint
app.post('/api/keys', (req, res) => {
  const { workerId } = req.body;
  
  if (workerId < 1 || workerId > 8) {
    return res.status(400).json({ 
      error: 'Worker ID must be between 1-8' 
    });
  }
  
  // Generate a new API key (simulated)
  const newKey = crypto.randomBytes(16).toString('hex');
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  
  res.json({
    workerId,
    key: `realm-key-${newKey}`,
    expires: expires.toISOString(),
    status: 'ACTIVE'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    version: '4.0',
    workers: 8,
    realmName: 'Appleseed Mining Realm'
  });
});

app.listen(PORT, () => {
  console.log(`Master Keeper Realm API server running on port ${PORT}`);
  console.log('Identity separation enforced: Kano (Appleseed) <-> GitHub (ircinco-mh)');
});
