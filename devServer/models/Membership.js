const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Membership = sequelize.define('membership', {
        user_id: Sequelize.INTEGER,
        group_id: Sequelize.INTEGER,
        approveAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    })

    return Membership;
}