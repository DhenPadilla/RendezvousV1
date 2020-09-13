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
        // Searches User-table to look for friend via username
        // then runs friendshipUtils.createFriendship on the found friend
        createFriendRequestWithUsername: async (parent, { username }, { models, user }) => {
            if (user) {
                try {
                    const friend = await userUtils.getUserViaUsername(username);
                    if (!friend) throw new Error('User not found!');
                    const friendship = await friendshipUtils.createFriendRequest(user, friend.user.id);
                    if (!friendship) throw new Error(friendship.error);
                    return {
                        success: friendship.success,
                        message: "Successfully created new friendship!"
                    };
                } catch(err) {
                    return {
                        success: false,
                        errors: [
                            {
                                path: 'create-friend-request',
                                message: err
                            }
                        ]
                    }
                }
            } else {
                throw new AuthenticationError('No Access!');
            }

        },
        acceptFriendRequestWithUsername: async (parent, { username }, { models, user }) => {
            if (user) {
                try {
                    const friend = await userUtils.getUserViaUsername(username);
                    if (!friend) throw new Error('User not found!');
                    const friendship = await friendshipUtils.acceptFriendRequest(user, friend.user.id);
                    if (!friendship.success) throw new Error(friendship.error);
                    return {
                        success: true,
                        message: "Successfully created new friendship!"
                    };
                } catch(err) {
                    return {
                        success: false,
                        errors: [
                            {
                                path: 'accept-friend-request',
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