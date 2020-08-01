module.exports = 
`
    type Friendship {
        id: Int!,
        user: User!
        friend: User!,
        status: Int!
    }

    type FriendshipResponse {
        success: Boolean!,
        message: String,
        errors: [Error!]
    }

    type Mutation {
        createFriendshipFromUsername(username: String!): FriendshipResponse!
    }
`
;