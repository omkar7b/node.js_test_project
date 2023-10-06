const Sequelize = require('sequelize');

const sequelize = new Sequelize('blog-post', 'root', 'root123',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;