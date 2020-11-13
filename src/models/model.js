const Sequelize = require('sequelize')
const UserModel = require('../models/user.model')
const NoteModel = require('../models/note.model')
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = require('../config/config');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const User = UserModel(sequelize, Sequelize)
const Note = NoteModel(sequelize, Sequelize)

User.hasMany(Note);

// sequelize.sync({ force: true }).then(() => {
//     console.log(`Database & tables created!`)
// });

module.exports = {
    User,
    Note
}
