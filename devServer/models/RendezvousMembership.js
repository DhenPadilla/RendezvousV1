const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const RendezvousMembership = sequelize.define('rendezvous_membership', {
        friendshipId: Sequelize.INTEGER,
        groupId: Sequelize.INTEGER,
        rendezvousId: Sequelize.INTEGER
    })

    return RendezvousMembership;
}