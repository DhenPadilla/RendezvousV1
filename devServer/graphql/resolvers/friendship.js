const friendshipUtils = require('../../utils/friendship');
const userUtils = require('../../utils/user');
const { AuthenticationError } = require('apollo-server-express');

module.exports =  {
    Mutation: {
        createFriendshipFromUsername: async (parent, { username }, {models, user}) => {
            console.log( user);
            if (user) {
                console.log(" Inside create friendship");
                console.log(user);
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