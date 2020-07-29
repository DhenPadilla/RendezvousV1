module.exports =  {
    Mutation: {
        createGroup: async (parent, args, {models, user}) => {
            try {
                await models.Group(models.sequelize).create( { ...args, owner: user.id });
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        },
    },
};