const Report = require('../models/Report');

// @desc    Create a new report
// @route   POST /
exports.createReport = async (req, res) => {
    const { judul, deskripsi, kategori, lokasi, lampiran } = req.body;
    try {
        const newReport = new Report({
            judul,
            deskripsi,
            kategori,
            lokasi,
            lampiran,
            user: req.user.id // ID pengguna dari token JWT
        });
        const report = await newReport.save();
        res.status(201).json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all reports
// @route   GET /
exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.json(reports);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc    Get single report by ID
// @route   GET /:id
exports.getReportById = async (req, res) => {
    try {
        // Ambil ID dari parameter URL (contoh: /api/reports/60d21b4667d0d8992e610c85)
        const report = await Report.findById(req.params.id);

        // Jika laporan dengan ID tersebut tidak ditemukan, kirim error 404
        if (!report) {
            return res.status(404).json({ msg: 'Report not found' });
        }

        // Jika ditemukan, kirim data laporan sebagai response
        res.json(report);
    } catch (err) {
        console.error(err.message);

        // Jika ID tidak valid formatnya, Mongoose akan error, kirim 404 juga
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Report not found' });
        }

        res.status(500).send('Server Error');
    }
};

// @desc    Update report status by ID
// @route   PUT /:id/status
exports.updateReportStatus = async (req, res) => {
    try {
        // Ambil status baru dan catatan dari body request
        const { status, catatanPetugas } = req.body;

        // Validasi bahwa field status diisi
        if (!status) {
            return res.status(400).json({ msg: 'Status field is required' });
        }

        // Cari laporan berdasarkan ID dari parameter URL
        let report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({ msg: 'Report not found' });
        }

        // Update field yang relevan
        report.status = status;
        if (catatanPetugas) {
            report.catatanPetugas = catatanPetugas;
        }

        // Simpan perubahan ke database
        await report.save();

        // Kirim kembali data laporan yang sudah diupdate
        res.json(report);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};