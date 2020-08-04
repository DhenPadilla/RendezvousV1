const express = require('express');
const db = require('../models/index').sequelize;
const { User, Friendship } = require('../models/index');
const Op = require('sequelize').Op;

module.exports = {
    getFriendsForUser: async (userId) => {
        try {
            const user = await User.findOne({
                where: {
                    id: userId,
                },
                include: 'friends'
            })
            if (!user) throw new Error('User not found!');
            return {
                success: true,
                message: 'Successfully retrieved friends for user' + user.username,
                users: user.friends
            }
        } catch (error) {
            return {
                success: false,
                errors: [
                    {
                        path: 'graphql/getFriendsForUser',
                        message: error
                    }
                ]
            }
        }
    },
    createFriendship: async (userId, friendId) => {
        try {
            const friendship = await Friendship.findOne({
                where: {
                    userId: userId
                }
            });
            if(friendship) throw new Error("Friendship already exists");
            Friendship.create({
                userId: friendId,
                friendId: userId
            })
            Friendship.create({
                userId: userId,
                friendId: friendId
            });
            return {
                success: true
            }
            
        } catch (error) {
            return {
                success: false,
                error: error
            } 
        }
    }
}