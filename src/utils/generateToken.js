const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '5h', // Token expires in 5 hour
    });
};

module.exports = generateToken;