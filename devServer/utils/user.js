const express = require('express');
const router = express.Router();
const db = require('../models/index').sequelize;
const User = require('../models/index').User(db);
const Op = require('sequelize').Op;

module.exports = {
    create: function({firstName, lastName, username, email, password, status}) {
        return User.create({
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            password: password,
            status: status
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
        return User.findOne({
            where: {
              username: username
            },
            raw: true
        }).then((user) => {
            return user;
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