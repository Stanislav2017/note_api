module.exports = (sequelize, type) => {
    return sequelize.define('note', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: type.STRING,
            allowNull: false,
            notEmpty: true,
            max: 1000
        },
        isShared: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isPublic: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
};