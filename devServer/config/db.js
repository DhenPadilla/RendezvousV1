const Sequelize = require('sequelize');
module.exports = new Sequelize('rendezvous', 'postgres', 'JuLy7+98', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});