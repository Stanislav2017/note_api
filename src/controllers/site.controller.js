const { User } = require('../models/model');
const bcrypt = require('bcryptjs');
const { TOKEN_SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

const signIn = async function(req, res, next) {
    try {
        const { email, pass } = req.body;
        const foundUser = await User.find({ where: { email }});
        if (!foundUser) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const isMatch = bcrypt.compareSync(pass, foundUser.password);
        if (isMatch) {
            let payload = { email: foundUser.email, id: foundUser.id };
            return res.status(200).json({ token: jwt.sign(payload, TOKEN_SECRET) });
        } else {
            return res.status(401).json({ message: 'Incorrect data!' });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const signUp = async function(req, res, next) {
    try {
        const { email, pass } = req.body;
        await User.create({ email, password: pass });
        return res.status(201).json({ message: 'User successfully created!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    signIn,
    signUp
};