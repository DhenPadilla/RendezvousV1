module.exports =  {
    Query: {
        getUserByUsername(parent, args, { models }) { 
            try {
                return models.User(models.sequelize).findOne({ 
                    where: args 
                }).then((user) => {
                    return user;
                });
            }
            catch (err) {
                console.log(err);
                return {};
            }
        },
        allUsers(parent, args, { models }) { 
            return models.User(models.sequelize).findAll();
        }
    },
    Mutation: {
        signup(parent, args, { models }) {
            console.log(args);
            return models.User(models.sequelize).create(args);
        },
    }
};