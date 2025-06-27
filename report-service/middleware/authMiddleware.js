const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware untuk memverifikasi token JWT dari header Authorization.
 * Jika token valid, informasi user akan ditempelkan ke objek request.
 */
const auth = (req, res, next) => {
    // Ambil token dari header, formatnya: "Bearer <token>"
    const authHeader = req.header('Authorization');

    // Cek jika header Authorization tidak ada
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Pisahkan "Bearer" dari token-nya
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ msg: 'Token format is invalid, authorization denied' });
        }

        // Verifikasi token menggunakan secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Tempelkan payload user dari token ke objek request agar bisa digunakan oleh controller
        req.user = decoded.user;
        next(); // Lanjutkan ke middleware atau controller selanjutnya
    } catch (err) {
        // Kirim response error jika token tidak valid atau kadaluwarsa
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;