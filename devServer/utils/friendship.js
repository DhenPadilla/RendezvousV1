const express = require('express');
const db = require('../models/index').sequelize;
const Friendship = require('../models/index').Friendship(db);
const Op = require('sequelize').Op;

module.exports = {
    getAllFriendsForUser: (userID) => {
        return Friendship.findAll({
            where: {
                userId: userID
            }
        }).then((friendships) => {
            return friendships;
        })
    },
    createFriendship: (userId, friendId) => {
        return Friendship.create({
            userId: userId,
            friendId: friendId
        });
    }
}