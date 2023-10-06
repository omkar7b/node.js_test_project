const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Comment = sequelize.define('comments', {
    comment: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Comment;