// controllers/reportController.js
const Report = require('../models/Report');

// @desc    Membuat laporan baru
// @route   POST /api/reports
// @access  Protected
exports.createReport = async (req, res) => {
    const { judul, deskripsi, kategori } = req.body;
    try {
        const newReport = new Report({
            judul,
            deskripsi,
            kategori,
            user: req.user.id,
        });
        const report = await newReport.save();
        res.status(201).json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Mendapatkan semua laporan
// @route   GET /api/reports
// @access  Protected
exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find().populate('user', ['nama', 'alamat']).sort({ createdAt: -1 });
        res.json(reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Mendapatkan laporan berdasarkan ID
// @route   GET /api/reports/:id
// @access  Protected
exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id).populate('user', ['nama', 'alamat']);
        if (!report) {
            return res.status(404).json({ msg: 'Report not found' });
        }
        res.json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Mengubah status laporan
// @route   PUT /api/reports/:id/status
// @access  Protected (rt, rw, admin)
exports.updateReportStatus = async (req, res) => {
    const { status, catatanPetugas } = req.body;
    try {
        let report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ msg: 'Report not found' });
        }
        
        report.status = status;
        if(catatanPetugas) {
            report.catatanPetugas = catatanPetugas;
        }

        await report.save();
        res.json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};