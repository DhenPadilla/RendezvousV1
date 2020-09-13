const express = require('express');
const db = require('../models/index').sequelize;
const userUtils = require('./user');
const { User, Friendship, GroupMembership, Group } = require('../models/index');

module.exports = {
    create: async (args) => {
        try {
            const group = await Group.create(args);
            const owner = await userUtils.getUser(args.owner);
            // Also create the membership to the group
            await GroupMembership.create({
                userId: args.owner,
                groupId: group.id,
                userStatus: 0
            });
            if(owner.success) {
                group.owner = owner.user;
                return {
                    success: true,
                    message: 'Successfully created new group',
                    group: group  
                };
            }
            return {
                success: false,
                errors: [
                    {
                        path: 'graphql/createGroup',
                        message: 'Could not find owner. Group creation failed'
                    }
                ]
            }
        } catch(err) {
            console.log(err);
            return {
                success: false,
                errors: [
                    {
                        path: 'graphql/createGroup',
                        message: err
                    }
                ]
            };
        }
    },
}