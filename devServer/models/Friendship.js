const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Friendship = sequelize.define('friendship', {
        user_id: Sequelize.INTEGER,
        friend_id: Sequelize.INTEGER,
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0 
            // VALUES: 
            // 0 - pending 
            // 1 - approved 
            // 2 - user blocked friend
            // 3 - friend blocked user
        },
        approveAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    })
    return Friendship;
}