const express = require('express');
const router = express.Router();
const { User } = require('../models/index');
const Op = require('sequelize').Op;

module.exports = {
    create: function(args) {
        return User.create(args);
    },
    getUser: async (id) => {
        try {
            const user = await User.findOne({
                where: {
                    id: id,
                },
                include: [
                    'friends',
                    // 'groups'
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
    allUsers: function() {
        return User.findAll().then((users) => {
            return users
        });
    }
}