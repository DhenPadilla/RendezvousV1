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
    createFriendRequest: async (userId, friendId) => {
        try {
            const friendship = await Friendship.findOne({
                where: {
                    userId: userId,
                    friendId: friendId
                }
            });
            if(friendship) throw new Error("Friendship already exists");
            Friendship.create({
                userId: userId,
                friendId: friendId
            })
            return {
                success: true
            }
            
        } catch (error) {
            console.log("Error thrown...");
            console.log(error);
            return {
                success: false,
                error: error
            } 
        }
    },
    acceptFriendRequest: async (userId, friendId) => {
        try {
            const friendship = await Friendship.findOne({
                where: {
                    userId: friendId,
                    friendId: userId,
                    status: 1
                }
            });
            if(friendship) throw new Error("Friendship already exists");

            // First find the request and change to status: 1 - Friends
            let friendRequest = await Friendship.findOne({ 
                where: { 
                    userId: friendId,
                    friendId: userId,
                    status: 0
                } 
            })
            if(friendRequest) {
                console.log("Friend request found!", friendship);
                friendRequest.update({
                    status: 1
                })
                Friendship.create({
                    userId: userId,
                    friendId: friendId,
                    status: 1
                });
                return {
                    success: true
                }
            }
            throw new Error('Could not find friend request');
            
        } catch (error) {
            return {
                success: false,
                error: error
            } 
        }
    },
    checkFriendship: async (userId, friendId) => {
        try {
            const friendship = await Friendship.findOne({
                where: {
                    userId: userId,
                    friendId: friendId,
                    status: 1
                }
            });
            if(friendship) return { success: true }
            return { success: false }
        } catch (error) {
            console.log("Error thrown...");
            console.log(error);
            return {
                success: false,
                error: error
            } 
        }
    }, 
}