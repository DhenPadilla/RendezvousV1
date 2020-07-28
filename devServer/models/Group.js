const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Group = sequelize.define('group', {
        name: {
            type: Sequelize.STRING
        }
    });
    
    Group.associate = (models) => {
        Group.belongsToMany(models.User, {
            through: 'group_memberships',
            foreignKey: {
                name: 'groupId',
                field: 'group_id'
            }
        })
        Group.belongsTo(models.Rendezvous, {
            through: 'rendezvous_membership',
            foreignKey: {
                name: 'groupId',
                field: 'group_id'
            }
        })
    };

    return Group;
}