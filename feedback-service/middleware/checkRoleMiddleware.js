/**
 * Middleware untuk memeriksa role pengguna.
 * Ini adalah 'higher-order function', yaitu fungsi yang me-return fungsi lain.
 * Tujuannya agar bisa digunakan secara fleksibel untuk role yang berbeda-beda.
 *
 * @param {string[]} allowedRoles - Array berisi string role yang diizinkan, contoh: ['rt', 'admin']
 */
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        // Pastikan middleware ini dijalankan SETELAH authMiddleware,
        // sehingga req.user sudah tersedia.
        if (!req.user || !req.user.role) {
            return res.status(403).json({ msg: 'Forbidden: Role information is missing.' });
        }

        const userRole = req.user.role;

        // Cek apakah role pengguna saat ini termasuk dalam daftar role yang diizinkan
        if (allowedRoles.includes(userRole)) {
            next(); // Jika diizinkan, lanjutkan request ke controller
        } else {
            // Jika tidak diizinkan, kirim response 403 Forbidden (Akses Dilarang)
            res.status(403).json({ msg: 'Forbidden: You do not have the required role to access this resource.' });
        }
    };
};

module.exports = checkRole;