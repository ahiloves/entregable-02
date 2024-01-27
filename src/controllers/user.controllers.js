const catchError = require('../utils/catchError');
const User = require('../models/user');

const getAll = catchError(async(req, res) => {
    // Operaciones...
    const user = await User.findAll()
    return res.json( user /* valor a retornar */)
});

module.exports = {
    getAll
}