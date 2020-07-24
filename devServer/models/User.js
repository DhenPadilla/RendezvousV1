const Sequelize = require('sequelize');

module.exports = (db) => {
    const User = db.define('user', {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
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
            type: Sequelize.STRING
        }
    })
    
    User.associate = (models) => {
        User.belongsToMany(models.Group, {
            through: 'member',
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
        User.belongsToMany(models.User, {
            as: 'friends', 
            through: 'friendship', 
            foreignKey: {
                name: 'userId', 
                field: 'user_id'
            },
            otherKey: {
                name: 'friendId',
                field: 'friend_id'
            }
        })
    };

    return User;
}