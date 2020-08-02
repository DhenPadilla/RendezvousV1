const express = require('express');
const db = require('../models/index').sequelize;
const { User, Friendship } = require('../models/index');
const Op = require('sequelize').Op;

module.exports = {
    getAllFriendsForUser: (userId) => {
        return User.findAll({
            include: [
                {
                    model: User,
                    as: 'friends',
                    where: {
                        friend_id: userId
                    }
                }],
            // where: {
            //     friendId: userId
            // }
        }).then((friendships) => {
            console.log(friendships);
            return friendships;
        })
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