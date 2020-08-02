const Sequelize = require('sequelize');

module.exports = (db) => {
    const User = db.define('user', {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        email: {
            type: Sequelize.STRING
        },
        password: Sequelize.STRING,
        status: {
            type: Sequelize.INTEGER
            // 0 - Offline / Inactive
            // 1 - Available
            // 2 - On my way
            // 3 - Online & Busy
        }
    })
    
    User.associate = (models) => {
        User.belongsToMany(models.Group, {
            through: models.GroupMembership,
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
        User.belongsToMany(User, {
            as: 'friends',
            through: models.Friendship,
            foreignKey: "userId", 
            otherKey: "friendId"
        });
    };

    return User;
}