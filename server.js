require('dotenv').config();
const express = require('express');
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/profiles', profileRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
