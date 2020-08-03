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
            console.log(user.friends);
            return user.friends;
        } catch (error) {
          console.log(error);
        }
    // (userId) => {
    //     return User.findAll({
    //         include: [
    //             {
    //                 model: User,
    //                 as: 'friends',
    //                 where: {
    //                     user_id: userId
    //                 }
    //             }],
    //         // where: {
    //         //     friendId: userId
    //         // }
    //     }).then((friendships) => {
    //         console.log(friendships);
    //         return friendships;
    //     })
    },
    createFriendship: async (userId, friendId) => {
        const friendship = await Friendship.findOne({
            where: {
                userId: userId
            }
        });
        console.log(friendship);
        if(!friendship) {
            Friendship.create({
                userId: friendId,
                friendId: userId
            })
            return Friendship.create({
                userId: userId,
                friendId: friendId
            });
        }
        else {
            return {}
        }
    }
}