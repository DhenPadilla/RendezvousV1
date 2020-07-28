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
        }
    })

    Friendship.associate = (models) => {
        Friendship.belongsTo(models.Rendezvous, {
            through: 'rendezvous_membership',
            foreignKey: {
                name: 'friendshipId',
                field: 'friendship_id'
            }
        });
    }

    return Friendship;
}