const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    // Ambil token dari header 'Authorization'
    const authHeader = req.header('Authorization');

    // Cek jika header tidak ada
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Token dikirim dengan format "Bearer <token>"
        // Kita ambil bagian token-nya saja
        const token = authHeader.split(' ')[1];

        // Jika formatnya salah atau tidak ada token setelah "Bearer "
        if (!token) {
            return res.status(401).json({ msg: 'Token format is invalid, authorization denied' });
        }

        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Tempelkan payload user dari token ke objek request
        req.user = decoded.user;
        next(); // Lanjutkan ke controller
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;