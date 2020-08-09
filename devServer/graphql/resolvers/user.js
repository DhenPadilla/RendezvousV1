const userUtils = require('../../utils/user');
const authService = require('../../service/auth');
const friendshipUtils = require('../../utils/friendship');
const subs = require('../subscriptions.js');

module.exports =  {
    Query: {
        getUserByUsername: async (parent, args, { models }) =>{ 
            return await userUtils.getUserViaUsername(args);
        },
        allUsers: async (parent, args, { models }) => { 
            return await userUtils.allUsers();
        },
        getUser: async (parents, args, { models, user }) => {
            if(user) {
                return await userUtils.getUser(user);
            }
            return {
                success: false,
                errors: {
                    path: '/graphql/getUser',
                    message: 'Could not find user / userId is not defined in graphql context'
                }
            };
        }
    },
    Mutation: {
        signup: async (parent, args, { models }) => {
            return await authService.signup(args);
        },
        login: async (parent, {username, password}, { req, models }) => {
           let { success, message, token, refreshToken } = await authService.login(username, password);
           return {
               success,
               message,
               token
           };
        },
        updateStatus: async(parent, { status }, { user, pubSub }) => {
            if(user) {
                const result = await userUtils.updateStatus(status, user);
                if(result.success) {
                    // TODO - withFilter() friendships of user
                    pubSub.publish(subs.UPDATE_STATUS, {
                        updatedStatus: result.user
                    })
                }
                return result;
            }
            else {
                return {
                    success: false,
                    errors: [{
                        path: '/graphql/changeStatus',
                        message: 'Unable to change status of undefined user'
                    }]
                }
            }
        }
    },
    Subscription: {
        updatedStatus: {
            subscribe: (_, __, { pubSub }) => pubSub.asyncIterator(subs.UPDATE_STATUS)
        }
    }
};