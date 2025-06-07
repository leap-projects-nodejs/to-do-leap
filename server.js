// File: server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/api/todos', todoRoutes);

app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
