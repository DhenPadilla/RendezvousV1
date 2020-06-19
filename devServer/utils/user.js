const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');
const User = require('../models/User');

module.exports = {
    create: function(first_name, last_name, username, email, hashedPassword) {
        return User.create({
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: hashedPassword,
            status: "OFFLINE"
        });
    },
    getUserViaId: function(id) {
        return User.findAll({
            limit: 1,
            where: {
                id: id
            },
            order: [ [ 'createdAt', 'DESC' ]]
        }).then((user) => {
            return user[0];
        })
    },
    getUserViaUsername: function(username) {
        return User.findAll({
            limit: 1,
            where: {
              username: username
            },
            order: [ [ 'createdAt', 'DESC' ]]
        }).then((user) => {
            return user[0];
        });
    },
    getUserViaEmail: function(email) {
        return User.findAll({
            limit: 1,
            where: {
              email: email
            },
            order: [ [ 'createdAt', 'DESC' ]]
          }).then((user) => {
            return user[0];
        }); 
    },
}