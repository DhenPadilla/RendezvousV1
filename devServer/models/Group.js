const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Group = sequelize.define('group', {
        name: {
            type: Sequelize.STRING
        }
    });
    
    Group.associate = (models) => {
        Group.belongsToMany(models.User, {
            through: 'member',
            foreignKey: {
                name: 'groupId',
                field: 'group_id'
            }
        })
    };

    return Group;
}