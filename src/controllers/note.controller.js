const { Note } = require('../models/model');
const Sequelize = require('sequelize');

// Note list
const list = async (req, res, next) => {
    const user = req.user;
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    try {
        const count = await Note.count({ where: { userId: user.id }});
        const notes = await Note.findAll({ offset, limit, where: { userId: user.id }});
        return res.status(200).json({ count, notes });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// Create Note
const create = async (req, res, next) => {
    const { text, isPublic, isPublicLink, publicLinkToken } = req.body;
    const user = req.user;
    try {
        await Note.create({ text, userId: user.id, isPublic, isPublicLink, publicLinkToken });
        return res.status(201).json({ message: 'Note successfully created!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// Update Note
const update = async (req, res, next) => {
    const user = req.user;
    const { text, isPublic, isPublicLink, publicLinkToken } = req.body;
    const noteId = req.params.id;
    if (!noteId) {
        return res.status(422).json({ message:'The parameter id must be required!' });
    }
    
    try {
        await Note.update({ text, isPublic, isPublicLink, publicLinkToken }, { where: { userId: user.id, id: noteId }});
        return res.status(200).json({ message: 'Note successfully updated!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// Delete Note
const remove = async (req, res, next) => {
    const user = req.user;
    const noteId = req.params.id;
    if (!noteId) {
        return res.status(422).json({ message:'The parameter id must be required!' });
    }
    
    try {
        await Note.destroy({ where: { id: noteId, userId: user.id }});
        return res.status(200).json({ message: 'Note successfully deleted!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getById = async (req, res, next) => {
    const user = req.user;
    const noteId = req.params.id;
    if (!noteId) {
        return res.status(422).json({ message:'The parameter id must be required!' });
    }
    
    const { is_shared: isShared, is_public_link: isPublicLink } = req.query;
    let query = { id: noteId };

    if (isShared) {
        query['isShared'] = isShared;
    }

    if (isPublicLink) {
        query['isPublicLink'] = isPublicLink;
    }

    if (user) {
        query['userId'] = user.id;
    }
    try {
        const foundedNote = await Note.findOne(query);
        return res.status(200).json(foundedNote);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

module.exports = {
    list,
    create,
    update,
    remove,
    getById
};