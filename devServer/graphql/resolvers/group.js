const groupUtils = require('../../utils/group');
const { AuthenticationError } = require('apollo-server-express');

module.exports =  {
    Mutation: {
        createGroup: async (parent, args, { user }) => {
            if (user) {
                return await groupUtils.create({ ...args, owner: user });
            }
            else {
                throw new AuthenticationError('Cannot create a group from an unknown user');
            }
        },
    },
};