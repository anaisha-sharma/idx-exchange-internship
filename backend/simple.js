const express = require('express');
const app = express();
const PORT = 5001;

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Server is working on port 5001!'
    });
});

app.listen(PORT, () => {
    console.log('✅ Server running on http://localhost:' + PORT);
    console.log('✅ Health check: http://localhost:' + PORT + '/api/health');
});
