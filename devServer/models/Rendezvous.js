const Sequelize = require('sequelize');

// A table to hold rendezvous between users

module.exports = (sequelize) => {
    const Rendezvous = sequelize.define('rendezvous', {
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0 
            // VALUES: 
            // 0 - CREATED 
            // 1 - ACCEPTED
            // 2 - EDIT-REQUEST
            // 3 - DENY
            // 4 - COMPLETE
        },
        rendezvousLocation: {
            type: Sequelize.STRING,
            allowNull: true
        },
        rendezvousDate: {
            type: Sequelize.DATE,
            allowNull: true
        }
    })

    Rendezvous.associate = (models) => {
        Rendezvous.belongsTo(models.Friendship, {
            through: 'rendezvous_membership',
            foreignKey: {
                name: 'rendezvousId',
                field: 'rendezvous_id'
            }
        })
        // Rendezvous.belongsTo(models.Group, {
        //     through: 'rendezvous_membership',
        //     foreignKey: {
        //         name: 'rendezvousId',
        //         field: 'rendezvous_id'
        //     }
        // })
    }

    return Rendezvous;
}