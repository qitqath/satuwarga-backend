// api-gateway/index.js
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// Proxy untuk Auth Service
app.use('/api/auth', createProxyMiddleware({
    target: 'http://auth-service:5001',
    changeOrigin: true,
    pathRewrite: {
        '^/api/auth': '/',
    },
}));

// Proxy untuk Report Service
app.use('/api/reports', createProxyMiddleware({
    target: 'http://report-service:5002',
    changeOrigin: true,
    pathRewrite: {
        '^/api/reports': '/',
    },
}));

// Proxy untuk Announcement Service
app.use('/api/announcements', createProxyMiddleware({
    target: 'http://announcement-service:5003', // <-- Tambahkan ini
    changeOrigin: true,
    pathRewrite: {
        '^/api/announcements': '/',
    },
}));

// Proxy untuk Feedback Service
app.use('/api/feedback', createProxyMiddleware({
    target: 'http://feedback-service:5004', // <-- Tambahkan ini
    changeOrigin: true,
    pathRewrite: {
        '^/api/feedback': '/',
    },
}));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});