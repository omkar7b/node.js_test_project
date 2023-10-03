const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const blogPost = sequelize.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
});