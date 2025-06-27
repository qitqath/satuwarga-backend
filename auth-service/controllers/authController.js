const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Register a new user
// @route   POST /register
exports.register = async (req, res) => {
    const { nama, email, password, alamat, role } = req.body;
    try {
        // Cek apakah email sudah terdaftar
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Buat instance user baru
        user = new User({
            nama,
            email,
            password,
            alamat,
            role // Role bisa 'warga', 'rt', dll. Defaultnya 'warga' jika tidak diisi.
        });

        // Enkripsi password sebelum disimpan
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Login user & get token
// @route   POST /login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Cek pengguna berdasarkan email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Bandingkan password yang diinput dengan yang ada di database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Buat payload untuk JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        // Buat dan kirim token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' }, // Token berlaku selama 5 jam
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        nama: user.nama,
                        role: user.role
                    }
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Get logged in user profile
// @route   GET /me
exports.getMe = async (req, res) => {
    try {
        // req.user.id didapatkan dari middleware setelah token di-decode
        // Cari pengguna berdasarkan id dan jangan sertakan field password
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get logged in user profile
// @route   GET /me
exports.getMe = async (req, res) => {
    try {
        // req.user.id didapatkan dari middleware setelah token di-decode
        // Kita cari user berdasarkan id, dan .select('-password') berarti
        // kita tidak ingin menyertakan field password dalam hasilnya.
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};