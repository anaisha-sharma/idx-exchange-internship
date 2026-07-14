require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const pool = require('./db/pool'); 

const app = express();
const PORT = process.env.PORT || 5001;



// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

app.use(cors());
app.use(express.json());


app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {

    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});


const propertiesRouter = require('./routes/properties');
app.use('/api/properties', propertiesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


