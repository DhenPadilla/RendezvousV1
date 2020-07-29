module.exports = {
    Mutation: {
        createRendezvous: async (parents, args, { models }) => {
            try {
                console.log(args);
                await models.Rendezvous(models.sequelize).create(args);
            } catch(err) {
                console.log(err);
                return false;
            }
        }
    }
}