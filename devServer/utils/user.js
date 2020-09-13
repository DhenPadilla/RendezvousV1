const express = require('express');
const router = express.Router();
const { User } = require('../models/index');
const Op = require('sequelize').Op;

module.exports = {
    create: (args) => {
        return User.create(args);
    },
    getUser: async (id) => {
        try {
            const user = await User.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: User,
                        as: 'friends',
                        where: {
                            status: 1,
                        },
                        required: false
                    }
                    // TODO - 'groups'
                ]
            })
            if (!user) throw new Error('User not found!');
            return {
                success: true,
                user: user,
            };
        } catch (error) {
            return {
                success: false,
                errors: [
                    { 
                        path: 'getUser',
                        message: error
                    }
                ]
            };
        }
    },
    getUserViaUsername: async (username) => {
        try {
            let user = await User.findOne({
                where: {
                    username: username
                },
                raw: true
            });
            if(!user) throw new Error('Could not find user');
            return {
                success: true,
                user: user
            }
        } catch (error) {
            return {
                success: false,
                errors: [
                    {
                        path: 'graphql/getUserViaUsername',
                        message: error
                    }
                ]
            }
        }
    },
    getUserViaEmail: async (email) => {
        try {
            let user = await User.findOne({
                where: {
                    email: email
                },
            });
            if(!user) throw new Error('Could not find user');
            return {
                success: true,
                user: user
            }
        } catch (error) {
            return {
                success: false,
                errors: [
                    {
                        path: 'graphql/getUserViaUsername',
                        message: error
                    }
                ]
            }
        }
    },
    allUsers: () => {
        return User.findAll().then((users) => {
            return users
        });
    },
    updateStatus: async(status, userId) => {
        try {
            const updatedUser = await User.update({
                status: status,
              }, {
                where: { id: userId },
                // Returns postgres object (:D No need for secondary findOne() call)
                returning: true,
                // Returns the plain object & no unnecessary mess -- Again.. Cool :D 
                plain: true
              });
            if (updatedUser[0] == 0) throw new Error('Could not update user status');
            return {
                success: true,
                user: updatedUser[1].dataValues
            }
        } catch (error) {
            return {
                success: false,
                errors: [
                    {
                        path: 'graphql/updateStatus',
                        message: error
                    }
                ]
            }
        }
    }
}