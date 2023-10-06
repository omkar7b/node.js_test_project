const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const blogPost = sequelize.define('blogs', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = blogPost;
