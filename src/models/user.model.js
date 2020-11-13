module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: type.STRING,
            allowNull: false,
            isEmail: true,
            notEmpty: true,
            unique: true
        },
        password: {
            type: type.STRING,
            allowNull: false,
            notEmpty: true
        } 
    })
};