const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const GroupMembership = sequelize.define('group_membership', {
        userId: Sequelize.INTEGER,
        groupId: Sequelize.INTEGER,
        approveAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    })

    return GroupMembership;
}