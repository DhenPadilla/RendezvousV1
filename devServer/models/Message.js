const Sequelize = require('sequelize');

// A table to hold rendezvous between users

module.exports = (sequelize) => {
    const Message = sequelize.define('message', {
        userId: Sequelize.INTEGER,
        groupId: Sequelize.INTEGER,
        message: Sequelize.STRING,
        approvedOn: {
            type: Sequelize.DATE,
            allowNull: true
        }
    })

    Message.associate = (models) => {
        Message.belongsTo(models.User, {
            foreignKey: 'userId'
        })
        // Message.belongsTo(models.Friend)
    }

    return Message;
}