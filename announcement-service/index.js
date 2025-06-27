const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', require('./routes/announcementRoutes'));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Announcement Service running on port ${PORT}`));