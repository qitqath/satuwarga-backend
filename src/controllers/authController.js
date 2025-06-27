// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// @desc    Mendaftarkan pengguna baru
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    const { nama, email, password, alamat, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ nama, email, password, alamat, role });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Mengautentikasi pengguna & mendapatkan token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { id: user.id, role: user.role };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        nama: user.nama,
                        role: user.role,
                    },
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Mendapatkan data pengguna yang login
// @route   GET /api/auth/me
// @access  Protected
exports.getMe = async (req, res) => {
    try {
        // req.user sudah dilampirkan oleh middleware 'protect'
        res.json(req.user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};