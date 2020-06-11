require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'PRODUCTION';

const Sequelize = require('sequelize');
module.exports = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    // host: isProduction ? psql_url : 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});