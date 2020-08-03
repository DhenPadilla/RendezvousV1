const friendshipUtils = require('../../utils/friendship');
const userUtils = require('../../utils/user');
const { AuthenticationError } = require('apollo-server-express');

module.exports =  {
    Query: {
        getFriendsForUser: async(parent, args, { models, user }) => {
            return await friendshipUtils.getFriendsForUser(user.id);
        }
    },
    Mutation: {
        createFriendshipFromUsername: async (parent, { username }, {models, user}) => {
            console.log("Creating friendship!");
            if (user) {
                console.log(" Inside create friendship");
                try {
                    const friend = await userUtils.getUserViaUsername(username);
                    await friendshipUtils.createFriendship(user.id, friend.id);
                    console.log(
                        {
                            success: true,
                            message: "Successfully created new friendship!"
                        }
                    )
                    return {
                        success: true,
                        message: "Successfully created new friendship!"
                    };
                } catch(err) {
                    console.log(err);
                    return {
                        success: false,
                        errors: [
                            {
                                path: 'create-friendship',
                                message: err
                            }
                        ]
                    }
                }
            } else {
                throw new AuthenticationError('No Access!');
            }

        },
    },
};